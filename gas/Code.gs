const KINDS = {tea:'紅茶の質問',organization:'お店・団体からのご相談',other:'その他'};
function props_(){return PropertiesService.getScriptProperties();}
function secret_(){const p=props_();let s=p.getProperty('SIGNING_SECRET');if(!s){s=Utilities.getUuid()+Utilities.getUuid();p.setProperty('SIGNING_SECRET',s);}return s;}
function sign_(value){return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(value,secret_()));}
function doGet(e){const t=HtmlService.createTemplateFromFile('Form');t.kind=Object.prototype.hasOwnProperty.call(KINDS,e?.parameter?.kind)?e.parameter.kind:'tea';return t.evaluate().setTitle('PJソクラテス 問い合わせ').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);}
function issueTicket(){const lock=LockService.getScriptLock();lock.waitLock(5000);try{const value=Date.now()+'.'+Utilities.getUuid();return {value,signature:sign_(value)};}finally{lock.releaseLock();}}
function submitContact(raw){
 const fail=message=>({ok:false,message});
 if(!raw||typeof raw!=='object')return fail('入力をご確認ください。');
 const ticket=raw.ticket||{};const age=Date.now()-Number(String(ticket.value).split('.')[0]);
 if(typeof ticket.value!=='string'||ticket.value.length>100||ticket.signature!==sign_(ticket.value)||!Number.isFinite(age)||age<3000||age>3600000)return fail('受付の有効時間を確認できません。少し待ってから、ページを開き直してください。');
 const str=(v,max)=>typeof v==='string'&&v.trim().length<=max?v.trim():null;
 const name=str(raw.name,100),email=str(raw.email,254),message=str(raw.message,3000);
 if(raw.website||!Object.prototype.hasOwnProperty.call(KINDS,raw.kind)||!name||!email||!message||raw.consent!==true||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email)||/[\r\n]/.test(email)||(message.match(/https?:\/\/|www\./gi)||[]).length>2)return fail('必須項目・文字数・リンク数をご確認ください。');
 const extras=['region','period','people'].map(k=>str(raw[k]||'',100));if(extras.some(v=>v===null))return fail('任意項目は100字以内で入力してください。');
 const lock=LockService.getScriptLock();if(!lock.tryLock(5000))return fail('混み合っています。少し待ってからお試しください。');
 try{
 const p=props_(),now=Date.now(),day=Utilities.formatDate(new Date(now),'Asia/Tokyo','yyyy-MM-dd');
 for(const [k,v] of Object.entries(p.getProperties())){if(k.startsWith('request:')&&now-JSON.parse(v).at>86400000)p.deleteProperty(k);}
 const key='request:'+ticket.value,existing=p.getProperty(key);
 if(existing){const state=JSON.parse(existing).state;return state==='sent'?{ok:true}:fail('送信結果を確認できません。重ねて送らず、時間をおいてご確認ください。');}
 const countKey='counts:'+day,counts=JSON.parse(p.getProperty(countKey)||'{"total":0}');
 if(counts.total>=30||MailApp.getRemainingDailyQuota()<1)return fail('本日の受付上限に達しました。日を改めてお送りください。');
 const recipient=p.getProperty('CONTACT_RECIPIENT');if(!recipient)return fail('受付の準備ができていません。');
 p.setProperty(key,JSON.stringify({at:now,state:'sending'}));
 try{MailApp.sendEmail({to:recipient,replyTo:email,subject:'【PJソクラテス】'+KINDS[raw.kind],body:['種別：'+KINDS[raw.kind],'お名前：'+name,'返信先：'+email,raw.kind==='organization'?'地域：'+extras[0]+'\n時期：'+extras[1]+'\n人数：'+extras[2]:'','内容：\n'+message].join('\n\n')});}catch(_){p.setProperty(key,JSON.stringify({at:now,state:'unknown'}));return fail('送信結果を確認できません。入力内容はそのまま残しています。重複送信を避け、時間をおいてご確認ください。');}
 counts.total++;counts[raw.kind]=(counts[raw.kind]||0)+1;p.setProperty(countKey,JSON.stringify(counts));p.setProperty(key,JSON.stringify({at:now,state:'sent'}));return {ok:true};
 }catch(_){return fail('送信結果を確認できません。入力内容はそのまま残しています。');}finally{lock.releaseLock();}
}
