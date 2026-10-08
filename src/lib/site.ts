export const SITE={
 name:'PJソクラテス',fullName:'プロジェクトソクラテス',url:'https://tsdsystem.tokyo',
 description:'カフェインを気遣う日も、好きな紅茶を。母への感謝から始まった、カフェインレス紅茶と自分のためのお茶時間を探す記録です。',
 maker:'土志田 拓郎',tradeName:'TSDシステム',title:'ホームウェルネス・ティーマイスター',
 socials:[] as {name:string;url:string}[]
};
export const themes=[
 {id:'choose',number:'01',title:'選びたい',subtitle:'自分に合う一杯を見つける',description:'カフェインレス紅茶の表示や味わいを確かめながら、好きな一杯を探すための知恵袋です。'},
 {id:'brew',number:'02',title:'おいしく淹れたい',subtitle:'香りと味わいを、もう少し',description:'茶葉の量、湯温、時間。淹れ方による違いを確かめ、おいしく楽しむ工夫をまとめます。'},
 {id:'enjoy',number:'03',title:'お茶時間を楽しみたい',subtitle:'自分のために、ひと息つく',description:'グラスや器、冷たい一杯、家族との時間。紅茶のある日常を楽しむヒントを紹介します。'}
] as const;
export function formUrl(kind?:string){
 const value=import.meta.env.PUBLIC_GAS_FORM_URL||'';
 if(!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(value))return '';
 const url=new URL(value);
 if(kind&&['tea','organization','other'].includes(kind))url.searchParams.set('kind',kind);
 return url.toString();
}
