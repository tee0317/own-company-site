export const SITE={
 name:'プロジェクトソクラテス',fullName:'プロジェクトソクラテス',url:'https://tsdsystem.tokyo',
 description:'プロジェクトソクラテスは、香りと味わいを大切にしたカフェインレス紅茶の選び方や淹れ方、お茶時間の楽しみを伝える場所です。母への感謝から始まった、一杯を探す取り組みと読みものをお届けします。',
 maker:'土志田 拓郎',tradeName:'TSDシステム',title:'ホームウェルネス・ティーマイスター',
 socials:[] as {name:string;url:string}[]
};
export const themes=[
 {id:'choose',number:'01',title:'選びたい',subtitle:'自分に合う一杯を見つける',description:'カフェインレス紅茶の表示や味わいを確かめながら、好きな一杯を探すための読みものです。'},
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

export const scenes=[
 {id:'night',label:'EVENING',title:'夜、自分に戻るひと息に。',description:'一日の用事を終えて、本をひらく。好きな香りと、静かに過ごすための小さな時間。',photo:'暗い台の上の一杯.jpg',alt:'暗い台の上に置かれた一杯の紅茶',focus:'50% 50%',guide:'夜の一杯は、まず表示を確かめるところから。カフェインレスでもカフェインが残る商品があります。好きな香りと、含有量や淹れ方の情報を、一緒に見てみましょう。',articles:['decaf-tea-labels','decaf-tea-brewing']},
 {id:'work',label:'AFTERNOON',title:'仕事の合間、気分を変えたいときに。',description:'手を止めて、お湯を注ぐ。画面から少し離れて、一杯に向き合うひと区切り。',photo:'三杯の飲み比べ.jpg',alt:'色の濃さが違う三杯の紅茶と茶葉',focus:'50% 50%',guide:'忙しい日にも、いつものカップで一杯を。まずはパッケージの淹れ方を目安にすると、次に調整したい味の手がかりが見つかります。',articles:['decaf-tea-brewing']},
 {id:'weekend',label:'WEEKEND',title:'家族と囲む、休日のテーブルに。',description:'会話とおやつのそばに、冷たい一杯を。大切な人と過ごす、いつもよりゆっくりした午後。',photo:'家族で囲む紅茶の時間.jpg',alt:'家族の手がテーブルの紅茶を囲む様子',focus:'50% 50%',guide:'休日には、グラスの色も楽しむアイスティーを。茶葉の選び方と冷やし方を知って、自分や一緒に飲む人の好みに合う一杯を考えてみませんか。',articles:['iced-tea-cloudiness','decaf-tea-labels']}
] as const;
