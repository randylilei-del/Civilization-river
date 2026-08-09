/* ---------- 传播轨迹:stops 按年代排序,p=上游节点索引(默认前一个) ---------- */
const TRACES = [
{ n:['青铜技术','Bronze metallurgy'], stops:[
  { y:-3300, l:'me', t:['两河冶铜合金','Mesopotamian alloying'], d:['铜锡合金在两河与安纳托利亚成熟,催生武器与礼器革命。','Copper-tin alloys mature in Mesopotamia and Anatolia.'] },
  { y:-2700, l:'eu', t:['爱琴海','Aegean'], d:['经安纳托利亚传入爱琴海世界,米诺斯宫殿文明的物质基础。','Reaches the Aegean via Anatolia — the material base of Minoan palaces.'] },
  { y:-2000, l:'st', t:['草原之路','The steppe route'], d:['塞伊玛-图尔宾诺现象:冶金技术随草原人群快速东传。','The Seima-Turbino horizon carries metallurgy rapidly east.'] },
  { y:-1700, l:'ea', t:['中原(二里头)','Central Plain (Erlitou)'], d:['中原接过技术后走出独特道路:块范法铸造大型礼器。','China takes the craft its own way — piece-mold casting of great ritual vessels.'] },
] },
{ n:['铁器','Ironworking'], stops:[
  { y:-1200, l:'me', t:['赫梯崩溃后扩散','Spreads after the Hittite fall'], d:['王国崩溃后铁匠流散四方,冶铁不再限于少数作坊,铁器时代开启。','The kingdom falls and its smiths scatter and the Iron Age opens.'] },
  { y:-800, l:'eu', t:['哈尔施塔特欧洲','Hallstatt Europe'], d:['凯尔特世界进入铁器时代。','The Celtic world enters the Iron Age.'] },
  { y:-800, l:'sa', t:['印度乌兹钢','Indian wootz', ], d:['南亚发展出后来闻名世界的坩埚钢(大马士革钢原料)。','South Asia develops crucible steel — the future Damascus blades.'], p:0 },
  { y:-600, l:'ea', t:['中国铸铁','Chinese cast iron'], d:['中国率先掌握生铁冶铸,领先欧洲近两千年。','China casts iron nearly two millennia before Europe.'], p:0 },
  { y:-500, l:'af', t:['努比亚与诺克','Nubia & Nok'], d:['麦罗埃成为非洲冶铁中心;西非诺克文化独立(或传入)用铁。','Meroë becomes Africa\'s iron hub; Nok ironworking may be independent.'], p:0 },
] },
{ n:['字母文字','The alphabet'], stops:[
  { y:-1050, l:'me', t:['腓尼基字母','Phoenician letters'], d:['22 个辅音字母,为记账而生。','Twenty-two consonants, invented for bookkeeping.'] },
  { y:-800, l:'eu', t:['希腊加上元音','Greeks add vowels'], d:['第一个完整表音字母;经伊特鲁里亚传为拉丁字母。','The first full phonetic alphabet; via Etruria it becomes Latin.'] },
  { y:-300, l:'sa', t:['婆罗米系(学界有争议)','Brahmi scripts (debated)'], d:['多数学者认为婆罗米文源自阿拉姆字母,衍生出印度与东南亚诸文字。','Brahmi, likely from Aramaic, fathers the scripts of India and SE Asia.'], p:0 },
] },
{ n:['造纸术','Papermaking'], stops:[
  { y:105, l:'ea', t:['蔡伦改良','Cai Lun\'s refinement'], d:['树皮麻头为纸,书写成本骤降。','Bark and hemp make writing cheap.'] },
  { y:751, l:'st', t:['怛罗斯之战','Battle of Talas'], d:['被俘唐军工匠把技术带到撒马尔罕。','Captured Tang artisans carry the craft to Samarkand.'] },
  { y:793, l:'me', t:['巴格达纸坊','Baghdad paper mills'], d:['纸取代莎草与羊皮,支撑翻译运动。','Paper replaces papyrus and parchment, fueling the translation movement.'] },
  { y:1150, l:'eu', t:['传入欧洲','Reaches Europe'], d:['经西班牙、意大利北上;三百年后与印刷术相遇。','Via Spain and Italy — three centuries later it meets the press.'] },
] },
{ n:['印刷术','Printing'], stops:[
  { y:868, l:'ea', t:['雕版《金刚经》','Diamond Sutra woodblock'], d:['现存最早有明确纪年的印刷书。','The earliest dated printed book extant.'] },
  { y:1041, l:'ea', t:['毕昇活字','Bi Sheng\'s movable type'], d:['泥活字发明;此后木活字、铜活字相继。','Ceramic movable type, then wood and bronze.'] },
  { y:1234, l:'ea', t:['高丽金属活字','Korean metal type'], d:['金属活字印《详定礼文》,早于古腾堡两百年。','Metal type in Korea, two centuries before Gutenberg.'] },
  { y:1450, l:'eu', t:['古腾堡(可能独立发明)','Gutenberg (likely independent)'], d:['字母文字+螺旋压机+油墨:欧洲知识复制成本崩塌,思想革命随之而来。','Alphabet + press + oil ink: copying costs collapse in Europe.'] },
] },
{ n:['火药','Gunpowder'], stops:[
  { y:850, l:'ea', t:['炼丹的副产品','An alchemist\'s byproduct'], d:['唐代方士求长生反得火药;宋代用于战争。','Tang alchemists seeking immortality find powder; Song puts it to war.'] },
  { y:1232, l:'st', t:['蒙古战争西传','Carried west by Mongol wars'], d:['震天雷与火器随蒙古军队横越欧亚。','Thunder-crash bombs travel with the Mongol armies.'] },
  { y:1280, l:'me', t:['阿拉伯手抄本','Arabic manuals'], d:['配方见于阿拉伯军事手册。','The recipe appears in Arabic military manuscripts.'] },
  { y:1326, l:'eu', t:['欧洲火炮','European cannon'], d:['欧洲把它锻造成攻城炮与舰炮——最终反过来轰开旧世界。','Europe forges it into siege and ship guns — and turns them back on the old world.'] },
] },
{ n:['佛教','Buddhism'], stops:[
  { y:-250, l:'sa', t:['阿育王传法','Ashoka\'s missions'], d:['羯陵伽之战后皈依,遣使四方传法。','After Kalinga, missions go out in every direction.'] },
  { y:-100, l:'st', t:['中亚绿洲佛国','Central Asian oases'], d:['贵霜治下犍陀罗造像;龟兹、于阗成译经重镇。','Gandhara carves the Buddha; Kucha and Khotan become translation hubs.'] },
  { y:67, l:'ea', t:['传入中国','Enters China'], d:['白马驮经;四百年后深入人心。','The White Horse carries the sutras; four centuries later it is everywhere.'] },
  { y:372, l:'ea', t:['传入朝鲜半岛','Enters Korea'], d:['经前秦入高句丽,再传百济新罗。','Via the northern kingdoms to Baekje and Silla.'] },
  { y:552, l:'ea', t:['传入日本','Enters Japan'], d:['百济献佛像经卷;飞鸟时代佛教立国。','Baekje sends images and sutras; Asuka Japan builds on it.'] },
  { y:250, l:'se', t:['南传上座部','Theravada moves south'], d:['经斯里兰卡传入东南亚,至今是中南半岛底色。','Via Sri Lanka into Southeast Asia — the mainland\'s faith to this day.'], p:0 },
] },
{ n:['基督教','Christianity'], stops:[
  { y:30, l:'me', t:['诞生于巴勒斯坦','Born in Roman Palestine'], d:['沿罗马道路与航线在帝国内扩散。','Spreads along Roman roads and sea lanes.'] },
  { y:313, l:'eu', t:['米兰敕令','Edict of Milan'], d:['合法化到国教化,一个世纪内完成。','From legal to official within a century.'] },
  { y:330, l:'af', t:['阿克苏姆皈依','Aksum converts'], d:['埃塞俄比亚教会的源头,比罗马国教化更早。','The Ethiopian church — earlier than Rome\'s establishment.'], p:0 },
  { y:988, l:'eu', t:['罗斯受洗','Baptism of Rus'], d:['拜占庭正教北传斯拉夫世界。','Byzantine Orthodoxy moves north into the Slavic world.'], p:1 },
  { y:1521, l:'am', t:['随征服者入美洲','With the conquistadors'], d:['传教与殖民并行,重塑两大洲信仰版图。','Mission and conquest together remake two continents.'], p:1 },
  { y:1850, l:'af', t:['深入撒南非洲','Into sub-Saharan Africa'], d:['传教士世纪;今日非洲是基督徒人口增长最快的大陆。','The missionary century; Africa now grows fastest.'], p:1 },
] },
{ n:['伊斯兰教','Islam'], stops:[
  { y:622, l:'me', t:['希吉拉','The Hijra'], d:['从麦地那出发,一个世纪横跨三洲。','From Medina, three continents in a century.'] },
  { y:711, l:'eu', t:['伊比利亚','Iberia'], d:['安达卢斯八百年,直到 1492。','Al-Andalus endures eight centuries, until 1492.'], p:0 },
  { y:751, l:'st', t:['中亚','Central Asia'], d:['河中地区渐次伊斯兰化,突厥人皈依后成为其武力担当。','Transoxiana converts; the Turks become Islam\'s sword.'], p:0 },
  { y:1000, l:'af', t:['跨撒哈拉','Across the Sahara'], d:['随驼队与黄金贸易南传西非。','South with the caravans and the gold trade.'], p:0 },
  { y:1206, l:'sa', t:['德里苏丹国','Delhi Sultanate'], d:['伊斯兰政权统治北印,南亚信仰版图从此双轨。','Muslim rule in north India; the subcontinent\'s faiths run twin tracks.'], p:0 },
  { y:1400, l:'se', t:['马六甲改宗','Malacca converts'], d:['随印度洋商路东传;今日印尼是穆斯林第一大国。','East on the ocean trade; Indonesia is now the largest Muslim nation.'], p:0 },
] },
{ n:['哥伦布大交换','Columbian Exchange'], stops:[
  { y:1492, l:'am', t:['两个半球相接','Hemispheres joined'], d:['马、小麦、甘蔗与病菌西来;原住民人口锐减九成。','Horses, wheat, sugar — and pathogens; native populations collapse.'] },
  { y:1550, l:'eu', t:['玉米土豆入欧','Maize & potato to Europe'], d:['土豆最终养活了欧洲的人口爆炸。','The potato ultimately feeds Europe\'s population boom.'] },
  { y:1580, l:'ea', t:['玉米红薯入华','Maize & sweet potato to China'], d:['山地作物助推清代人口破三亿。','Hill crops help Qing China past 300 million.'], p:0 },
  { y:1600, l:'af', t:['木薯玉米入非','Cassava & maize to Africa'], d:['至今仍是非洲主粮;同一航线上驶着奴隶船。','Still Africa\'s staples — carried on the same routes as the slave ships.'], p:0 },
] },
];
