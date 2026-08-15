/* ---------- 传播轨迹:stops 按年代排序,p=上游节点索引(默认前一个) ----------
   v179 起每条带 g=分组(tech 科学技术 / life 生活风物 / faith 思想宗教),
   下拉列表按组渲染(TR_GROUP 在 index.html);audit 规则 54 拦无效分组。
   口径纪律同六问:主流共识、传播路线有争议处在 d 里写明、不写单因论。 */
const TRACES = [
{ g:'tech', n:['青铜技术','Bronze metallurgy'], stops:[
  { y:-3300, l:'me', t:['两河冶铜合金','Mesopotamian alloying'], d:['铜锡合金在两河与安纳托利亚成熟,催生武器与礼器革命。','Copper-tin alloys mature in Mesopotamia and Anatolia.'] },
  { y:-2700, l:'eu', t:['爱琴海','Aegean'], d:['经安纳托利亚传入爱琴海世界,米诺斯宫殿文明的物质基础。','Reaches the Aegean via Anatolia — the material base of Minoan palaces.'] },
  { y:-2000, l:'st', t:['草原之路','The steppe route'], d:['塞伊玛-图尔宾诺现象:冶金技术随草原人群快速东传。','The Seima-Turbino horizon carries metallurgy rapidly east.'] },
  { y:-1700, l:'ea', t:['中原(二里头)','Central Plain (Erlitou)'], d:['中原接过技术后走出独特道路:块范法铸造大型礼器。','China takes the craft its own way — piece-mold casting of great ritual vessels.'] },
] },
{ g:'tech', n:['铁器','Ironworking'], stops:[
  { y:-1200, l:'me', t:['赫梯崩溃后扩散','Spreads after the Hittite fall'], d:['王国崩溃后铁匠流散四方,冶铁不再限于少数作坊,铁器时代开启。','The kingdom falls and its smiths scatter and the Iron Age opens.'] },
  { y:-800, l:'eu', t:['哈尔施塔特欧洲','Hallstatt Europe'], d:['凯尔特世界进入铁器时代。','The Celtic world enters the Iron Age.'] },
  { y:-800, l:'sa', t:['印度乌兹钢','Indian wootz', ], d:['南亚发展出后来闻名世界的坩埚钢(大马士革钢原料)。','South Asia develops crucible steel — the future Damascus blades.'], p:0 },
  { y:-600, l:'ea', t:['中国铸铁','Chinese cast iron'], d:['中国率先掌握生铁冶铸,领先欧洲近两千年。','China casts iron nearly two millennia before Europe.'], p:0 },
  { y:-500, l:'af', t:['努比亚与诺克','Nubia & Nok'], d:['麦罗埃成为非洲冶铁中心;西非诺克文化独立(或传入)用铁。','Meroë becomes Africa\'s iron hub; Nok ironworking may be independent.'], p:0 },
] },
{ g:'tech', n:['字母文字','The alphabet'], stops:[
  { y:-1050, l:'me', t:['腓尼基字母','Phoenician letters'], d:['22 个辅音字母,为记账而生。','Twenty-two consonants, invented for bookkeeping.'] },
  { y:-800, l:'eu', t:['希腊加上元音','Greeks add vowels'], d:['第一个完整表音字母;经伊特鲁里亚传为拉丁字母。','The first full phonetic alphabet; via Etruria it becomes Latin.'] },
  { y:-300, l:'sa', t:['婆罗米系(学界有争议)','Brahmi scripts (debated)'], d:['多数学者认为婆罗米文源自阿拉姆字母,衍生出印度与东南亚诸文字。','Brahmi, likely from Aramaic, fathers the scripts of India and SE Asia.'], p:0 },
] },
{ g:'tech', n:['造纸术','Papermaking'], stops:[
  { y:105, l:'ea', t:['蔡伦改良','Cai Lun\'s refinement'], d:['树皮麻头为纸,书写成本骤降。','Bark and hemp make writing cheap.'] },
  { y:751, l:'st', t:['怛罗斯之战','Battle of Talas'], d:['被俘唐军工匠把技术带到撒马尔罕。','Captured Tang artisans carry the craft to Samarkand.'] },
  { y:793, l:'me', t:['巴格达纸坊','Baghdad paper mills'], d:['纸取代莎草与羊皮,支撑翻译运动。','Paper replaces papyrus and parchment, fueling the translation movement.'] },
  { y:1150, l:'eu', t:['传入欧洲','Reaches Europe'], d:['经西班牙、意大利北上;三百年后与印刷术相遇。','Via Spain and Italy — three centuries later it meets the press.'] },
] },
{ g:'tech', n:['印刷术','Printing'], stops:[
  { y:868, l:'ea', t:['雕版《金刚经》','Diamond Sutra woodblock'], d:['现存最早有明确纪年的印刷书。','The earliest dated printed book extant.'] },
  { y:1041, l:'ea', t:['毕昇活字','Bi Sheng\'s movable type'], d:['泥活字发明;此后木活字、铜活字相继。','Ceramic movable type, then wood and bronze.'] },
  { y:1234, l:'ea', t:['高丽金属活字','Korean metal type'], d:['金属活字印《详定礼文》,早于古腾堡两百年。','Metal type in Korea, two centuries before Gutenberg.'] },
  { y:1450, l:'eu', t:['古腾堡(可能独立发明)','Gutenberg (likely independent)'], d:['字母文字+螺旋压机+油墨:欧洲知识复制成本崩塌,思想革命随之而来。','Alphabet + press + oil ink: copying costs collapse in Europe.'] },
] },
{ g:'tech', n:['火药','Gunpowder'], stops:[
  { y:850, l:'ea', t:['炼丹的副产品','An alchemist\'s byproduct'], d:['唐代方士求长生反得火药;宋代用于战争。','Tang alchemists seeking immortality find powder; Song puts it to war.'] },
  { y:1232, l:'st', t:['蒙古战争西传','Carried west by Mongol wars'], d:['震天雷与火器随蒙古军队横越欧亚。','Thunder-crash bombs travel with the Mongol armies.'] },
  { y:1280, l:'me', t:['阿拉伯手抄本','Arabic manuals'], d:['配方见于阿拉伯军事手册。','The recipe appears in Arabic military manuscripts.'] },
  { y:1326, l:'eu', t:['欧洲火炮','European cannon'], d:['欧洲把它锻造成攻城炮与舰炮——最终反过来轰开旧世界。','Europe forges it into siege and ship guns — and turns them back on the old world.'] },
] },
{ g:'faith', n:['佛教','Buddhism'], stops:[
  { y:-250, l:'sa', t:['阿育王传法','Ashoka\'s missions'], d:['羯陵伽之战后皈依,遣使四方传法。','After Kalinga, missions go out in every direction.'] },
  { y:-100, l:'st', t:['中亚绿洲佛国','Central Asian oases'], d:['贵霜治下犍陀罗造像;龟兹、于阗成译经重镇。','Gandhara carves the Buddha; Kucha and Khotan become translation hubs.'] },
  { y:67, l:'ea', t:['传入中国','Enters China'], d:['白马驮经;四百年后深入人心。','The White Horse carries the sutras; four centuries later it is everywhere.'] },
  { y:372, l:'ea', t:['传入朝鲜半岛','Enters Korea'], d:['经前秦入高句丽,再传百济新罗。','Via the northern kingdoms to Baekje and Silla.'] },
  { y:552, l:'ea', t:['传入日本','Enters Japan'], d:['百济献佛像经卷;飞鸟时代佛教立国。','Baekje sends images and sutras; Asuka Japan builds on it.'] },
  { y:250, l:'se', t:['南传上座部','Theravada moves south'], d:['经斯里兰卡传入东南亚,至今是中南半岛底色。','Via Sri Lanka into Southeast Asia — the mainland\'s faith to this day.'], p:0 },
] },
{ g:'faith', n:['基督教','Christianity'], stops:[
  { y:30, l:'me', t:['诞生于巴勒斯坦','Born in Roman Palestine'], d:['沿罗马道路与航线在帝国内扩散。','Spreads along Roman roads and sea lanes.'] },
  { y:313, l:'eu', t:['米兰敕令','Edict of Milan'], d:['合法化到国教化,一个世纪内完成。','From legal to official within a century.'] },
  { y:330, l:'af', t:['阿克苏姆皈依','Aksum converts'], d:['埃塞俄比亚教会的源头,比罗马国教化更早。','The Ethiopian church — earlier than Rome\'s establishment.'], p:0 },
  { y:988, l:'eu', t:['罗斯受洗','Baptism of Rus'], d:['拜占庭正教北传斯拉夫世界。','Byzantine Orthodoxy moves north into the Slavic world.'], p:1 },
  { y:1521, l:'am', t:['随征服者入美洲','With the conquistadors'], d:['传教与殖民并行,重塑两大洲信仰版图。','Mission and conquest together remake two continents.'], p:1 },
  { y:1850, l:'af', t:['深入撒南非洲','Into sub-Saharan Africa'], d:['传教士世纪;今日非洲是基督徒人口增长最快的大陆。','The missionary century; Africa now grows fastest.'], p:1 },
] },
{ g:'faith', n:['伊斯兰教','Islam'], stops:[
  { y:622, l:'me', t:['希吉拉','The Hijra'], d:['从麦地那出发,一个世纪横跨三洲。','From Medina, three continents in a century.'] },
  { y:711, l:'eu', t:['伊比利亚','Iberia'], d:['安达卢斯八百年,直到 1492。','Al-Andalus endures eight centuries, until 1492.'], p:0 },
  { y:751, l:'st', t:['中亚','Central Asia'], d:['河中地区渐次伊斯兰化,突厥人皈依后成为其武力担当。','Transoxiana converts; the Turks become Islam\'s sword.'], p:0 },
  { y:1000, l:'af', t:['跨撒哈拉','Across the Sahara'], d:['随驼队与黄金贸易南传西非。','South with the caravans and the gold trade.'], p:0 },
  { y:1206, l:'sa', t:['德里苏丹国','Delhi Sultanate'], d:['伊斯兰政权统治北印,南亚信仰版图从此双轨。','Muslim rule in north India; the subcontinent\'s faiths run twin tracks.'], p:0 },
  { y:1400, l:'se', t:['马六甲改宗','Malacca converts'], d:['随印度洋商路东传;今日印尼是穆斯林第一大国。','East on the ocean trade; Indonesia is now the largest Muslim nation.'], p:0 },
] },
{ g:'life', n:['哥伦布大交换','Columbian Exchange'], stops:[
  { y:1492, l:'am', t:['两个半球相接','Hemispheres joined'], d:['马、小麦、甘蔗与病菌西来;原住民人口锐减九成。','Horses, wheat, sugar — and pathogens; native populations collapse.'] },
  { y:1550, l:'eu', t:['玉米土豆入欧','Maize & potato to Europe'], d:['土豆最终养活了欧洲的人口爆炸。','The potato ultimately feeds Europe\'s population boom.'] },
  { y:1580, l:'ea', t:['玉米红薯入华','Maize & sweet potato to China'], d:['山地作物助推清代人口破三亿。','Hill crops help Qing China past 300 million.'], p:0 },
  { y:1600, l:'af', t:['木薯玉米入非','Cassava & maize to Africa'], d:['至今仍是非洲主粮;同一航线上驶着奴隶船。','Still Africa\'s staples — carried on the same routes as the slave ships.'], p:0 },
] },
/* ---- v179 扩容批(Ray 全选 A–G):补齐四大发明的指南针 + 数学 + 四条生活风物 + 马镫 ---- */
{ g:'tech', n:['指南针','The Compass'], stops:[
  { y:-250, l:'ea', t:['司南','The south-pointer'], d:['战国文献里已有「司南」之名,汉代书里说它是勺形磁石——但从没挖出过一件实物,它长什么样、灵不灵,今天只能猜。可以确定的是:人类先知道磁石认方向,一千多年后才带它出海。','Ancient texts describe a lodestone \'south-pointer\' — though none has ever been dug up. What is certain: people knew lodestones point the way long before anyone took a needle to sea.'] },
  { y:1100, l:'ea', t:['磁针上船','Needles go to sea'], d:['沈括记下磁针制法,广州海船「阴晦观指南针」——航海罗盘的世界最早记载在北宋。','Shen Kuo describes the needle; Song ships steer by it in overcast weather — the first record of marine compasses.'] },
  { y:1190, l:'eu', t:['地中海','The Mediterranean'], d:['12 世纪末欧洲文献开始提到磁针;它怎么走完中间这段路,史料没留下细节。','European texts mention the needle by the late 12th century; how it crossed the middle stretch, the sources never say.'] },
  { y:1492, l:'eu', t:['大航海','The Age of Sail'], d:['罗盘加海图让远洋成为常规;哥伦布的横渡从这里接上「哥伦布大交换」那条轨迹。','Compass plus chart makes ocean crossings routine — this trace hands off to the Columbian Exchange.'] },
] },
{ g:'tech', n:['「零」的旅行','The Journey of Zero'], stops:[
  { y:500, l:'sa', t:['印度:零与十进制','India: zero and place value'], d:['印度人先让「没有」在数位里占住一个位,628 年婆罗摩笈多又写下它的运算规则——零成了真正的数,今天全世界写数字的方式在这里定型。','India first lets "nothing" hold a place, then Brahmagupta (628) writes the rules for it as a number — the way the whole world writes numbers is set here.'] },
  { y:820, l:'me', t:['巴格达的算术书','Baghdad arithmetic'], d:['花拉子米把印度数字写进算术书,阿拉伯学界全面采用——「代数」一词就出自他的书名。','Al-Khwarizmi puts the Indian numerals into his arithmetic; "algebra" comes from his book title.'] },
  { y:1202, l:'eu', t:['斐波那契带回欧洲','Fibonacci brings it home'], d:['比萨商人之子在北非学会新数字,写成《计算之书》;欧洲账房又抵抗了两百年才放下罗马数字。','A Pisan merchant\'s son learns the numerals in North Africa; Europe\'s counting houses resist for two more centuries.'] },
] },
{ g:'tech', n:['马镫','The Stirrup'], stops:[
  { y:300, l:'ea', t:['中国:最早的证据','China: the earliest evidence'], d:['最早的马镫证据都出自中国——先是约 300 年骑俑上的脚镫,随后有了出土实物;一个踏环让骑手解放双手。','The earliest evidence of stirrups is Chinese — first on rider figurines, then surviving iron pairs; a foot-ring frees the rider\'s hands.'] },
  { y:560, l:'st', t:['草原西传','West across the steppe'], d:['阿瓦尔人带着马镫西迁,草原骑兵把它一路带到欧洲门口。','The Avars carry stirrups west; steppe cavalry delivers them to Europe\'s doorstep.'] },
  { y:730, l:'eu', t:['欧洲骑兵','European cavalry'], d:['法兰克军队采用马镫,人马合一的冲击骑兵从此可行——它对骑士时代有多大功劳,史学家至今还在争。','Frankish armies adopt it and shock cavalry becomes possible — how much it made the age of knights, historians still debate.'] },
] },
{ g:'life', n:['瓷器','Porcelain'], stops:[
  { y:200, l:'ea', t:['中国:瓷器烧成','China fires true porcelain'], d:['东汉的窑火里烧出最早的瓷——比陶更硬、更致密、敲起来有金石声,配方保密一千五百年。','China fires its first porcelain in Han-era kilns — harder and denser than pottery, its recipe a secret for 1,500 years.'] },
  { y:830, l:'me', t:['一船瓷器去巴格达','A shipload for Baghdad'], d:['「黑石号」沉船装着五万件长沙窑瓷器驶向阿拔斯;伊斯兰陶工仿不出瓷胎,就画上钴蓝——这抹蓝后来又回到中国,成了青花。','The Belitung wreck carries 50,000 pieces toward the Abbasids; Islamic potters, unable to match the body, answer with cobalt blue — a blue that later returns to China as blue-and-white.'] },
  { y:1600, l:'eu', t:['欧洲的瓷器热','Europe\'s porcelain fever'], d:['明代外销青花让欧洲王室痴迷两百年,英语干脆管瓷器叫 china。','Ming export blue-and-white obsesses Europe for two centuries — English simply calls it "china".'] },
  { y:1708, l:'eu', t:['迈森破解配方','Meissen cracks the recipe'], d:['德累斯顿的工匠终于烧出欧洲第一炉硬质瓷,千年技术秘密就此揭晓。','Dresden craftsmen fire Europe\'s first true porcelain; the millennium-old secret is out.'] },
] },
{ g:'life', n:['茶','Tea'], stops:[
  { y:760, l:'ea', t:['陆羽《茶经》','The Classic of Tea'], d:['唐人把喝茶变成一门讲究,陆羽为它写了世界第一部专著。','Tang China turns tea into an art; Lu Yu writes the world\'s first book about it.'] },
  { y:1191, l:'ea', t:['禅僧带到日本','Zen monks take it to Japan'], d:['荣西从宋朝带回茶种与吃茶法,几百年后长成日本茶道。','Eisai brings seeds and the custom home from Song China; centuries later it grows into the tea ceremony.'] },
  { y:1650, l:'eu', t:['欧洲:下午茶','Europe: afternoon tea'], d:['荷兰商船把茶运进欧洲,英国人把它喝成国民习惯——为买茶花掉的白银多到引发贸易失衡。','Dutch ships bring tea to Europe; Britain drinks it into a national habit — and a trade imbalance.'] },
  { y:1850, l:'sa', t:['印度大茶园','India\'s plantations'], d:['英国人把茶苗和制茶匠人从中国带到阿萨姆与大吉岭,印度茶园从此供应世界。','Britain moves tea plants and tea makers from China to Assam and Darjeeling; India\'s gardens go on to supply the world.'] },
] },
{ g:'life', n:['国际象棋','Chess'], stops:[
  { y:600, l:'sa', t:['印度:恰图兰卡','India: chaturanga'], d:['笈多时代的「四军棋」:车、马、象、兵,四个兵种摆上棋盘。','The Gupta-era "four divisions" game: chariots, horses, elephants and foot soldiers take the board.'] },
  { y:650, l:'me', t:['波斯与阿拉伯世界','Persia and the Caliphate'], d:['波斯宫廷把它改成 shatranj,阿拉伯征服后风靡整个伊斯兰世界——英语里的 checkmate(将死)就来自波斯语 shāh māt:「王完了」。','Persia refines it into shatranj and the Islamic world falls for it — "checkmate" descends from the Persian shah.'] },
  { y:1000, l:'eu', t:['进入欧洲','Into Europe'], d:['经西班牙与西西里传入欧洲宫廷,成了骑士教育的一部分。','Via Spain and Sicily it enters Europe\'s courts and a knight\'s education.'] },
  { y:1475, l:'eu', t:['王后觉醒','The queen awakes'], d:['原本一步一格的「维齐尔」变成横冲直撞的王后——当时的人叫它「疯王后的棋」,那就是今天的国际象棋。','The plodding vizier becomes the rampaging queen — players called it "mad queen\'s chess"; it is the game we play today.'] },
] },
{ g:'life', n:['咖啡','Coffee'], stops:[
  { y:1400, l:'af', t:['埃塞俄比亚高原','The Ethiopian highlands'], d:['咖啡树原生于此;牧羊人发现羊吃了红果子蹦蹦跳跳的故事,是后人补的传说。','Coffee is native here; the tale of the goatherd and his dancing goats is a later legend.'] },
  { y:1500, l:'me', t:['也门:摩卡港','Yemen: the port of Mocha'], d:['苏菲修士夜里祷告靠它提神,摩卡港垄断咖啡贸易两百年——「摩卡」从港口名变成了咖啡名。','Sufi mystics drink it to stay awake in night devotions; Mocha monopolises the trade for two centuries.'] },
  { y:1554, l:'me', t:['伊斯坦布尔咖啡馆','Istanbul coffeehouses'], d:['奥斯曼首都开出最早的一批咖啡馆,喝咖啡从修行变成社交。','The Ottoman capital opens its first coffeehouses; coffee turns from devotion to conversation.'] },
  { y:1650, l:'eu', t:['欧洲:便士大学','Europe: penny universities'], d:['伦敦人花一便士进咖啡馆听人谈天下事,称之为「便士大学」;保险业和报纸都在咖啡馆里发了芽。','A penny buys entry and conversation in London — insurance and newspapers both sprout in coffeehouses.'] },
  { y:1727, l:'am', t:['巴西种植园','Brazilian plantations'], d:['咖啡苗渡过大西洋;两百年后巴西供应全世界大半的咖啡。','Seedlings cross the Atlantic; within two centuries Brazil grows most of the world\'s coffee.'] },
] },
];
