/* ---------- 传播轨迹:stops 按年代排序,p=上游节点索引(默认前一个) ----------
   v182 起分组升级为「流」框架(Ray 定,按「什么在流动」分类,每流一个核心问题):
   goods 货物流(财富如何流动;生态类如哥伦布大交换并入此流) / knowledge 知识流(技术如何传播) /
   beliefs 信念流(人们为什么这样思考) / people 人口流(谁在流动) / institutions 制度流(社会如何组织)。
   下拉列表按组渲染(TR_GROUP 在 index.html),空组不渲染;audit 规则 54 拦无效分组。
   题材边界(Ray 定):奴隶贸易可做(口径收紧),黑死病这类瘟疫题材不做。
   口径纪律同六问:主流共识、传播路线有争议处在 d 里写明、不写单因论。

   ---- 人口流的入选判据(v189,Ray 认可;四条全中才做) ----
   1. **改变了目的地的语言或人口构成**——只是军事征服不算,那是色带该讲的事
   2. **跨至少两条泳道**——只在一个区域内部的移动是某个文明的内政
   3. **有 3 个以上能给出年份和地点的节点**——给不出就只是一团模糊的箭头
   4. **能给 7 岁讲成一个动作**:「谁,从哪儿,走到哪儿」

   立这条判据的由来:原来只有两条个案裁决(奴隶贸易做/黑死病不做),没有正面判据,
   于是每加一条都要重新吵一次,而且会系统性地偏向「当时恰好想到的那条」。
   回测:班图/突厥/奴隶贸易/下南洋四条全中;黑死病挂在第 1 条(流动的是病不是人),
   与原裁决一致。用它一扫浮出来的大缺口:印欧语系扩散(四条全中,争议大需写明)、
   维京扩张(站里连维京色带都没有)、南岛语族向西到马达加斯加、腓尼基与希腊的地中海
   殖民、日耳曼大迁徙。**加轨迹前先过这四条,过不了就别加。**
   ⚠ 判据只管「该不该做」,不管「画不画得出来」:停靠站的纵坐标由 l(泳道)决定,
   目的地没有对应泳道的轨迹画不出移动感(见 v189 大洋洲)。 */
const TRACES = [
{ g:'knowledge', n:['青铜技术','Bronze metallurgy'], stops:[
  { y:-3300, l:'me', t:['两河冶铜合金','Mesopotamian alloying'], d:['铜锡合金在两河与安纳托利亚成熟,催生武器与礼器革命。','Copper-tin alloys mature in Mesopotamia and Anatolia.'] },
  { y:-2700, l:'eu', t:['爱琴海','Aegean'], d:['经安纳托利亚传入爱琴海世界,米诺斯宫殿文明的物质基础。','Reaches the Aegean via Anatolia — the material base of Minoan palaces.'] },
  { y:-2000, l:'st', t:['草原之路','The steppe route'], d:['塞伊玛-图尔宾诺现象:冶金技术随草原人群快速东传。','The Seima-Turbino horizon carries metallurgy rapidly east.'] },
  { y:-1700, l:'ea', t:['中原(二里头)','Central Plain (Erlitou)'], d:['中原接过技术后走出独特道路:块范法铸造大型礼器。','China takes the craft its own way — piece-mold casting of great ritual vessels.'] },
] },
{ g:'knowledge', n:['铁器','Ironworking'], stops:[
  { y:-1200, l:'me', t:['赫梯崩溃后扩散','Spreads after the Hittite fall'], d:['王国崩溃后铁匠流散四方,冶铁不再限于少数作坊,铁器时代开启。','The kingdom falls and its smiths scatter and the Iron Age opens.'] },
  { y:-800, l:'eu', t:['哈尔施塔特欧洲','Hallstatt Europe'], d:['凯尔特世界进入铁器时代。','The Celtic world enters the Iron Age.'] },
  { y:-800, l:'sa', t:['印度乌兹钢','Indian wootz', ], d:['南亚发展出后来闻名世界的坩埚钢(大马士革钢原料)。','South Asia develops crucible steel — the future Damascus blades.'], p:0 },
  { y:-600, l:'ea', t:['中国铸铁','Chinese cast iron'], d:['中国率先掌握生铁冶铸,领先欧洲近两千年。','China casts iron nearly two millennia before Europe.'], p:0 },
  { y:-500, l:'af', t:['努比亚与诺克','Nubia & Nok'], d:['麦罗埃成为非洲冶铁中心;西非诺克文化独立(或传入)用铁。','Meroë becomes Africa\'s iron hub; Nok ironworking may be independent.'], p:0 },
] },
{ g:'knowledge', n:['字母文字','The alphabet'], stops:[
  { y:-1050, l:'me', t:['腓尼基字母','Phoenician letters'], d:['22 个辅音字母,为记账而生。','Twenty-two consonants, invented for bookkeeping.'] },
  { y:-800, l:'eu', t:['希腊加上元音','Greeks add vowels'], d:['第一个完整表音字母;经伊特鲁里亚传为拉丁字母。','The first full phonetic alphabet; via Etruria it becomes Latin.'] },
  { y:-300, l:'sa', t:['婆罗米系(学界有争议)','Brahmi scripts (debated)'], d:['多数学者认为婆罗米文源自阿拉姆字母,衍生出印度与东南亚诸文字。','Brahmi, likely from Aramaic, fathers the scripts of India and SE Asia.'], p:0 },
] },
{ g:'knowledge', n:['造纸术','Papermaking'], stops:[
  { y:105, l:'ea', t:['蔡伦改良','Cai Lun\'s refinement'], d:['树皮麻头为纸,书写成本骤降。','Bark and hemp make writing cheap.'] },
  { y:751, l:'st', t:['怛罗斯之战','Battle of Talas'], d:['被俘唐军工匠把技术带到撒马尔罕。','Captured Tang artisans carry the craft to Samarkand.'] },
  { y:793, l:'me', t:['巴格达纸坊','Baghdad paper mills'], d:['纸取代莎草与羊皮,支撑翻译运动。','Paper replaces papyrus and parchment, fueling the translation movement.'] },
  { y:1150, l:'eu', t:['传入欧洲','Reaches Europe'], d:['经西班牙、意大利北上;三百年后与印刷术相遇。','Via Spain and Italy — three centuries later it meets the press.'] },
] },
{ g:'knowledge', n:['印刷术','Printing'], stops:[
  { y:868, l:'ea', t:['雕版《金刚经》','Diamond Sutra woodblock'], d:['现存最早有明确纪年的印刷书。','The earliest dated printed book extant.'] },
  { y:1041, l:'ea', t:['毕昇活字','Bi Sheng\'s movable type'], d:['泥活字发明;此后木活字、铜活字相继。','Ceramic movable type, then wood and bronze.'] },
  { y:1234, l:'ea', t:['高丽金属活字','Korean metal type'], d:['金属活字印《详定礼文》,早于古腾堡两百年。','Metal type in Korea, two centuries before Gutenberg.'] },
  { y:1450, l:'eu', t:['古腾堡(可能独立发明)','Gutenberg (likely independent)'], d:['字母文字+螺旋压机+油墨:欧洲知识复制成本崩塌,思想革命随之而来。','Alphabet + press + oil ink: copying costs collapse in Europe.'] },
] },
{ g:'knowledge', n:['火药','Gunpowder'], stops:[
  { y:850, l:'ea', t:['炼丹的副产品','An alchemist\'s byproduct'], d:['唐代方士求长生反得火药;宋代用于战争。','Tang alchemists seeking immortality find powder; Song puts it to war.'] },
  { y:1232, l:'st', t:['蒙古战争西传','Carried west by Mongol wars'], d:['震天雷与火器随蒙古军队横越欧亚。','Thunder-crash bombs travel with the Mongol armies.'] },
  { y:1280, l:'me', t:['阿拉伯手抄本','Arabic manuals'], d:['配方见于阿拉伯军事手册。','The recipe appears in Arabic military manuscripts.'] },
  { y:1326, l:'eu', t:['欧洲火炮','European cannon'], d:['欧洲把它锻造成攻城炮与舰炮——最终反过来轰开旧世界。','Europe forges it into siege and ship guns — and turns them back on the old world.'] },
] },
{ g:'beliefs', n:['佛教','Buddhism'], stops:[
  { y:-250, l:'sa', t:['阿育王传法','Ashoka\'s missions'], d:['羯陵伽之战后皈依,遣使四方传法。','After Kalinga, missions go out in every direction.'] },
  { y:-100, l:'st', t:['中亚绿洲佛国','Central Asian oases'], d:['贵霜治下犍陀罗造像;龟兹、于阗成译经重镇。','Gandhara carves the Buddha; Kucha and Khotan become translation hubs.'] },
  { y:67, l:'ea', t:['传入中国','Enters China'], d:['白马驮经;四百年后深入人心。','The White Horse carries the sutras; four centuries later it is everywhere.'] },
  { y:250, l:'se', t:['南传上座部','Theravada moves south'], d:['经斯里兰卡传入东南亚,至今是中南半岛底色。','Via Sri Lanka into Southeast Asia — the mainland\'s faith to this day.'], p:0 },
  { y:372, l:'ea', t:['传入朝鲜半岛','Enters Korea'], d:['经前秦入高句丽,再传百济新罗。','Via the northern kingdoms to Baekje and Silla.'], p:2 },
  { y:552, l:'ea', t:['传入日本','Enters Japan'], d:['百济献佛像经卷;飞鸟时代佛教立国。','Baekje sends images and sutras; Asuka Japan builds on it.'] },
] },
{ g:'beliefs', n:['基督教','Christianity'], stops:[
  { y:30, l:'me', t:['诞生于巴勒斯坦','Born in Roman Palestine'], d:['沿罗马道路与航线在帝国内扩散。','Spreads along Roman roads and sea lanes.'] },
  { y:313, l:'eu', t:['米兰敕令','Edict of Milan'], d:['合法化到国教化,一个世纪内完成。','From legal to official within a century.'] },
  { y:330, l:'af', t:['阿克苏姆皈依','Aksum converts'], d:['埃塞俄比亚教会的源头,比罗马国教化更早。','The Ethiopian church — earlier than Rome\'s establishment.'], p:0 },
  { y:988, l:'eu', t:['罗斯受洗','Baptism of Rus'], d:['拜占庭正教北传斯拉夫世界。','Byzantine Orthodoxy moves north into the Slavic world.'], p:1 },
  { y:1521, l:'am', t:['随征服者入美洲','With the conquistadors'], d:['传教与殖民并行,重塑两大洲信仰版图。','Mission and conquest together remake two continents.'], p:1 },
  { y:1850, l:'af', t:['深入撒南非洲','Into sub-Saharan Africa'], d:['传教士世纪;今日非洲是基督徒人口增长最快的大陆。','The missionary century; Africa now grows fastest.'], p:1 },
] },
{ g:'beliefs', n:['伊斯兰教','Islam'], stops:[
  { y:622, l:'me', t:['希吉拉','The Hijra'], d:['从麦地那出发,一个世纪横跨三洲。','From Medina, three continents in a century.'] },
  { y:711, l:'eu', t:['伊比利亚','Iberia'], d:['安达卢斯八百年,直到 1492。','Al-Andalus endures eight centuries, until 1492.'], p:0 },
  { y:751, l:'st', t:['中亚','Central Asia'], d:['中亚渐次伊斯兰化;两百年后突厥人也皈依,伊斯兰世界从此有了突厥兵。','Central Asia converts; two centuries on the Turks convert too, and Turkic soldiers enter the Islamic world.'], p:0 },
  { y:1000, l:'af', t:['跨撒哈拉','Across the Sahara'], d:['随驼队与黄金贸易南传西非。','South with the caravans and the gold trade.'], p:0 },
  { y:1206, l:'sa', t:['德里苏丹国','Delhi Sultanate'], d:['伊斯兰政权统治北印,南亚信仰版图从此双轨。','Muslim rule in north India; the subcontinent\'s faiths run twin tracks.'], p:0 },
  { y:1400, l:'se', t:['马六甲改宗','Malacca converts'], d:['随印度洋商路东传;今日印尼是穆斯林第一大国。','East on the ocean trade; Indonesia is now the largest Muslim nation.'], p:0 },
] },
{ g:'goods', n:['哥伦布大交换','Columbian Exchange'], stops:[
  { y:1492, l:'am', t:['两个半球相接','Hemispheres joined'], d:['马、小麦、甘蔗与病菌西来;原住民人口锐减九成。','Horses, wheat, sugar — and pathogens; native populations collapse.'] },
  { y:1550, l:'eu', t:['玉米土豆入欧','Maize & potato to Europe'], d:['土豆最终养活了欧洲的人口爆炸。','The potato ultimately feeds Europe\'s population boom.'] },
  { y:1580, l:'ea', t:['玉米红薯入华','Maize & sweet potato to China'], d:['山地作物助推清代人口破三亿。','Hill crops help Qing China past 300 million.'], p:0 },
  { y:1600, l:'af', t:['木薯玉米入非','Cassava & maize to Africa'], d:['至今仍是非洲主粮;同一航线上驶着奴隶船。','Still Africa\'s staples — carried on the same routes as the slave ships.'], p:0 },
] },
/* ---- v179 扩容批(Ray 全选 A–G):补齐四大发明的指南针 + 数学 + 四条生活风物 + 马镫 ---- */
{ g:'knowledge', n:['指南针','The Compass'], stops:[
  { y:-250, l:'ea', t:['司南','The south-pointer'], d:['战国文献里已有「司南」之名,汉代书里说它是勺形磁石——但从没挖出过一件实物,它长什么样、灵不灵,今天只能猜。可以确定的是:人类先知道磁石认方向,一千多年后才带它出海。','Ancient texts describe a lodestone \'south-pointer\' — though none has ever been dug up. What is certain: people knew lodestones point the way long before anyone took a needle to sea.'] },
  { y:1100, l:'ea', t:['磁针上船','Needles go to sea'], d:['沈括记下磁针制法,广州海船「阴晦观指南针」——航海罗盘的世界最早记载在北宋。','Shen Kuo describes the needle; Song ships steer by it in overcast weather — the first record of marine compasses.'] },
  { y:1190, l:'eu', t:['地中海','The Mediterranean'], d:['12 世纪末欧洲文献开始提到磁针;它怎么走完中间这段路,史料没留下细节。','European texts mention the needle by the late 12th century; how it crossed the middle stretch, the sources never say.'] },
  { y:1492, l:'eu', t:['大航海','The Age of Sail'], d:['罗盘加海图让远洋成为常规;哥伦布的横渡从这里接上「哥伦布大交换」那条轨迹。','Compass plus chart makes ocean crossings routine — this trace hands off to the Columbian Exchange.'] },
] },
{ g:'knowledge', n:['「零」的旅行','The Journey of Zero'], stops:[
  { y:500, l:'sa', t:['印度:零与十进制','India: zero and place value'], d:['印度人先让「没有」在数位里占住一个位,628 年婆罗摩笈多又写下它的运算规则——零成了真正的数,今天全世界写数字的方式在这里定型。','India first lets "nothing" hold a place, then Brahmagupta (628) writes the rules for it as a number — the way the whole world writes numbers is set here.'] },
  { y:820, l:'me', t:['巴格达的算术书','Baghdad arithmetic'], d:['花拉子米把印度数字写进算术书,阿拉伯学界全面采用——「代数」一词就出自他的书名。','Al-Khwarizmi puts the Indian numerals into his arithmetic; "algebra" comes from his book title.'] },
  { y:1202, l:'eu', t:['斐波那契带回欧洲','Fibonacci brings it home'], d:['比萨商人之子在北非学会新数字,写成《计算之书》;欧洲账房又抵抗了两百年才放下罗马数字。','A Pisan merchant\'s son learns the numerals in North Africa; Europe\'s counting houses resist for two more centuries.'] },
] },
{ g:'knowledge', n:['马镫','The Stirrup'], stops:[
  { y:300, l:'ea', t:['中国:最早的证据','China: the earliest evidence'], d:['最早的马镫证据都出自中国——先是约 300 年骑俑上的脚镫,随后有了出土实物;一个踏环让骑手解放双手。','The earliest evidence of stirrups is Chinese — first on rider figurines, then surviving iron pairs; a foot-ring frees the rider\'s hands.'] },
  { y:560, l:'st', t:['草原西传','West across the steppe'], d:['阿瓦尔人带着马镫西迁,草原骑兵把它一路带到欧洲门口。','The Avars carry stirrups west; steppe cavalry delivers them to Europe\'s doorstep.'] },
  { y:730, l:'eu', t:['欧洲骑兵','European cavalry'], d:['法兰克军队采用马镫,人马合一的冲击骑兵从此可行——它对骑士时代有多大功劳,史学家至今还在争。','Frankish armies adopt it and shock cavalry becomes possible — how much it made the age of knights, historians still debate.'] },
] },
{ g:'goods', n:['瓷器','Porcelain'], stops:[
  { y:200, l:'ea', t:['中国:瓷器烧成','China fires true porcelain'], d:['东汉的窑火里烧出最早的瓷——比陶更硬、更致密、敲起来有金石声,配方保密一千五百年。','China fires its first porcelain in Han-era kilns — harder and denser than pottery, its recipe a secret for 1,500 years.'] },
  { y:830, l:'me', t:['一船瓷器去巴格达','A shipload for Baghdad'], d:['「黑石号」沉船装着五万件长沙窑瓷器驶向阿拔斯;伊斯兰陶工仿不出瓷胎,就画上钴蓝——这抹蓝后来又回到中国,成了青花。','The Belitung wreck carries 50,000 pieces toward the Abbasids; Islamic potters, unable to match the body, answer with cobalt blue — a blue that later returns to China as blue-and-white.'] },
  { y:1600, l:'eu', t:['欧洲的瓷器热','Europe\'s porcelain fever'], d:['明代外销青花让欧洲王室痴迷两百年,英语干脆管瓷器叫 china。','Ming export blue-and-white obsesses Europe for two centuries — English simply calls it "china".'] },
  { y:1708, l:'eu', t:['迈森破解配方','Meissen cracks the recipe'], d:['德累斯顿的工匠终于烧出欧洲第一炉硬质瓷,千年技术秘密就此揭晓。','Dresden craftsmen fire Europe\'s first true porcelain; the millennium-old secret is out.'] },
] },
{ g:'goods', n:['茶','Tea'], stops:[
  { y:760, l:'ea', t:['陆羽《茶经》','The Classic of Tea'], d:['唐人把喝茶变成一门讲究,陆羽为它写了世界第一部专著。','Tang China turns tea into an art; Lu Yu writes the world\'s first book about it.'] },
  { y:1191, l:'ea', t:['禅僧带到日本','Zen monks take it to Japan'], d:['荣西从宋朝带回茶种与吃茶法,几百年后长成日本茶道。','Eisai brings seeds and the custom home from Song China; centuries later it grows into the tea ceremony.'] },
  { y:1650, l:'eu', t:['欧洲:下午茶','Europe: afternoon tea'], d:['荷兰商船把茶运进欧洲,英国人把它喝成国民习惯——为买茶花掉的白银多到引发贸易失衡。','Dutch ships bring tea to Europe; Britain drinks it into a national habit — and a trade imbalance.'] },
  { y:1850, l:'sa', t:['印度大茶园','India\'s plantations'], d:['英国人把茶苗和制茶匠人从中国带到阿萨姆与大吉岭,印度茶园从此供应世界。','Britain moves tea plants and tea makers from China to Assam and Darjeeling; India\'s gardens go on to supply the world.'] },
] },
{ g:'goods', n:['国际象棋','Chess'], stops:[
  { y:600, l:'sa', t:['印度:恰图兰卡','India: chaturanga'], d:['笈多时代的「四军棋」:车、马、象、兵,四个兵种摆上棋盘。','The Gupta-era "four divisions" game: chariots, horses, elephants and foot soldiers take the board.'] },
  { y:650, l:'me', t:['波斯与阿拉伯世界','Persia and the Caliphate'], d:['波斯宫廷把它改成 shatranj,阿拉伯征服后风靡整个伊斯兰世界——英语里的 checkmate(将死)就来自波斯语 shāh māt:「王完了」。','Persia refines it into shatranj and the Islamic world falls for it — "checkmate" descends from the Persian shah.'] },
  { y:1000, l:'eu', t:['进入欧洲','Into Europe'], d:['经西班牙与西西里传入欧洲宫廷,成了骑士教育的一部分。','Via Spain and Sicily it enters Europe\'s courts and a knight\'s education.'] },
  { y:1475, l:'eu', t:['王后觉醒','The queen awakes'], d:['原本一步一格的「维齐尔」变成横冲直撞的王后——当时的人叫它「疯王后的棋」,那就是今天的国际象棋。','The plodding vizier becomes the rampaging queen — players called it "mad queen\'s chess"; it is the game we play today.'] },
] },
{ g:'goods', n:['咖啡','Coffee'], stops:[
  { y:1400, l:'af', t:['埃塞俄比亚高原','The Ethiopian highlands'], d:['咖啡树原生于此;牧羊人发现羊吃了红果子蹦蹦跳跳的故事,是后人补的传说。','Coffee is native here; the tale of the goatherd and his dancing goats is a later legend.'] },
  { y:1500, l:'me', t:['也门:摩卡港','Yemen: the port of Mocha'], d:['苏菲修士夜里祷告靠它提神,摩卡港垄断咖啡贸易两百年——「摩卡」从港口名变成了咖啡名。','Sufi mystics drink it to stay awake in night devotions; Mocha monopolises the trade for two centuries.'] },
  { y:1554, l:'me', t:['伊斯坦布尔咖啡馆','Istanbul coffeehouses'], d:['奥斯曼首都开出最早的一批咖啡馆,喝咖啡从修行变成社交。','The Ottoman capital opens its first coffeehouses; coffee turns from devotion to conversation.'] },
  { y:1650, l:'eu', t:['欧洲:便士大学','Europe: penny universities'], d:['伦敦人花一便士进咖啡馆听人谈天下事,称之为「便士大学」;保险业和报纸都在咖啡馆里发了芽。','A penny buys entry and conversation in London — insurance and newspapers both sprout in coffeehouses.'] },
  { y:1727, l:'am', t:['巴西种植园','Brazilian plantations'], d:['咖啡苗渡过大西洋;两百年后巴西供应全世界大半的咖啡。','Seedlings cross the Atlantic; within two centuries Brazil grows most of the world\'s coffee.'] },
] },
/* ---- v183 扩容批(Ray 全选):按五流框架补人口流 4 条、制度流 3 条、货物流 2 条 ---- */
{ g:'people', n:['班图大迁徙','The Bantu Expansion'], stops:[
  { y:-1500, l:'af', t:['出发:喀麦隆一带','Setting out from Cameroon'], d:['说班图语的农人从今喀麦隆一带出发,带着农耕技术、后来又带着冶铁,向东向南缓慢扩散——不是一次远征,是一代代人往前挪。','Bantu-speaking farmers set out from around Cameroon, carrying farming and, later, iron — not one march, but generations edging forward.'] },
  { y:-500, l:'af', t:['东非大湖','The Great Lakes'], d:['一支抵达东非大湖地区,与当地人群相遇融合;斯瓦希里语后来就是从这一支的语言里长出来的。','One stream reaches the Great Lakes and mingles with peoples already there; Swahili later grows out of this branch.'] },
  { y:400, l:'af', t:['南部非洲','Southern Africa'], d:['约 400 年前后抵达今南非东部——今天非洲中部、东部和南部的多数语言,都属于班图语族。','By about 400 CE they reach today\'s eastern South Africa — most languages of central, eastern and southern Africa belong to the Bantu family.'] },
] },
{ g:'people', n:['突厥人的西迁','The Turkic Migrations'], stops:[
  { y:552, l:'st', t:['金山起家','Smiths of the Altai'], d:['突厥人在阿尔泰山一带以锻铁起家,推翻柔然建立汗国,不到二十年就横贯草原。','Iron-smiths of the Altai overthrow the Rouran; within twenty years their khaganate stretches across the steppe.'] },
  { y:960, l:'st', t:['喀喇汗人成群皈依','The Karakhanids convert en masse'], d:['汗国崩解后各部陆续西移,各走各的。天山两侧的喀喇汗人改信伊斯兰教,999 年从萨曼人手里拿下布哈拉——中亚这一片从此多由讲突厥语的君主统治。','After the khaganate breaks up the tribes drift west, each on its own. The Karakhanids astride the Tianshan take up Islam and take Bukhara from the Samanids in 999 — from then on Central Asia is mostly ruled by Turkic-speaking kings.'] },
  { y:1055, l:'me', t:['塞尔柱人进巴格达','The Seljuks enter Baghdad'], d:['乌古斯部出身的塞尔柱人 1040 年击败伽色尼王朝拿下呼罗珊,又进巴格达替哈里发掌兵。往后几百年,从中亚到西亚,兵权多半握在突厥人手里。','The Seljuks, out of the Oghuz tribes, beat the Ghaznavids in 1040 to take Khurasan, then enter Baghdad to command the caliph\'s armies. For centuries after, from Central Asia to the Near East, the sword is mostly in Turkic hands.'] },
  { y:1071, l:'me', t:['进入安纳托利亚','Into Anatolia'], d:['塞尔柱人在曼齐刻尔特俘虏拜占庭皇帝,安纳托利亚此后逐渐突厥化。','At Manzikert the Seljuks capture the Byzantine emperor; Anatolia slowly turns Turkic.'] },
  { y:1453, l:'me', t:['奥斯曼收尾','The Ottoman finale'], d:['这场近五千公里的迁徙以奥斯曼人攻下君士坦丁堡收尾——「土耳其」这个国名里,至今装着「突厥」。','A migration of nearly 5,000 km ends with the Ottomans taking Constantinople — \'Turkey\' still carries the name \'Türk\'.'] },
] },
{ g:'people', n:['大西洋奴隶贸易','The Atlantic Slave Trade'], stops:[
  { y:1520, l:'af', t:['被掳走的人','The taken'], d:['欧洲船开始从西非海岸成批运走被掳的人;此后三百多年,上千万非洲人被迫横渡大西洋。','European ships begin carrying off captives from the West African coast; over three centuries more than ten million Africans are forced across the Atlantic.'] },
  { y:1600, l:'am', t:['种植园','The plantations'], d:['他们被卖到加勒比与巴西的甘蔗园、烟草田里做苦工;美洲积起的财富里,有相当一部分是用他们的苦难换来的。','Sold into the sugar and tobacco fields of the Caribbean and Brazil — much of the New World\'s wealth was made from their suffering.'] },
  { y:1807, l:'eu', t:['废奴','Abolition'], d:['英国立法禁止奴隶贸易,数十年内各国相继跟进;被带走的人的后代已在美洲扎根,他们的音乐与文化成了美洲底色的一部分。','Britain outlaws the trade in 1807 and others follow within decades; the descendants of the taken have put down roots, their music and culture now part of the Americas themselves.'] },
] },
{ g:'people', n:['华人下南洋','Chinese to the Nanyang'], stops:[
  { y:1200, l:'ea', t:['宋元海商','Song-Yuan merchants'], d:['泉州、广州的商人常年往来南海,有人就在贸易的港口住了下来——东南亚最早的华人聚落随商路出现。','Merchants of Quanzhou and Guangzhou settle in the ports they trade with — Southeast Asia\'s first Chinese communities appear along the sea lanes.'] },
  { y:1600, l:'se', t:['闽粤移民潮','Waves from Fujian and Guangdong'], d:['明清两代,闽粤沿海的人成批渡海谋生,马尼拉、巴达维亚、马六甲都有了唐人街。','Under Ming and Qing, coastal families cross the sea in numbers; Manila, Batavia and Malacca all grow Chinatowns.'] },
  { y:1850, l:'se', t:['下南洋高潮','The great southward wave'], d:['19 世纪矿山与种植园大量招工,数百万人「下南洋」;今天东南亚有三千多万华人,新加坡以华人为多数。','Mines and plantations draw millions more in the 19th century; today Southeast Asia is home to over thirty million ethnic Chinese, a majority in Singapore.'] },
] },
{ g:'institutions', n:['律令与科举的东亚之旅','Law Codes and Exams in East Asia'], stops:[
  { y:653, l:'ea', t:['唐:律令与科举','Tang: code and examination'], d:['《唐律疏议》定稿,科举定为常制——一套「国家该怎么组织」的完整方案在唐朝成形。','The Tang Code is finalised and the examinations become a fixture — a complete blueprint for organising a state.'] },
  { y:701, l:'ea', t:['日本大宝律令','Japan\'s Taihō Code'], d:['日本照唐制颁布大宝律令,连奈良、京都的街道都按长安的棋盘样子画。','Japan issues the Taihō Code on the Tang model; Nara and Kyoto are laid out on Chang\'an\'s grid.'] },
  { y:958, l:'ea', t:['高丽开科举','Goryeo adopts the exams'], d:['高丽引入科举取士,此后近千年,朝鲜半岛以考试选官。','Goryeo adopts the examinations; for nearly a millennium Korea chooses its officials by test.'] },
  { y:1075, l:'se', t:['越南开科','Vietnam follows'], d:['大越开科取士,汉字与儒学随制度南下——东亚的「考试文明圈」就此成形。','Đại Việt holds its first examinations; script and Confucian learning travel with the system — the East Asian \'examination world\' is complete.'] },
] },
{ g:'institutions', n:['罗马法的旅行','The Journey of Roman Law'], stops:[
  { y:-450, l:'eu', t:['十二表法','The Twelve Tables'], d:['罗马人把法律刻在十二块铜表上立于广场——规则写下来、人人可看,是它走向法治的第一步。','Rome posts its laws on twelve bronze tables in the Forum — written rules that anyone can read: its first step toward the rule of law.'] },
  { y:533, l:'eu', t:['查士丁尼法典','Justinian\'s Corpus'], d:['拜占庭把上千年的罗马法整理成《国法大全》——罗马城已经衰落,罗马法却被完整打包保存下来。','Justinian\'s compilers pack a thousand years of Roman law into the Corpus Juris — the city fades, but the law is boxed and kept.'] },
  { y:1088, l:'eu', t:['博洛尼亚重新发现','Rediscovered at Bologna'], d:['博洛尼亚的学者重新研读《国法大全》,欧洲第一所大学就围着这部法典长了出来。','Bologna\'s scholars reopen the Corpus Juris; Europe\'s first university grows up around the book.'] },
  { y:1804, l:'eu', t:['民法典时代','The age of civil codes'], d:['拿破仑法典把罗马法传统铸成现代民法典,随后传遍欧陆、拉美与东亚——今天多数国家的民法,家谱都能追到罗马。','The Napoleonic Code recasts the Roman inheritance as a modern civil code; most civil law today traces its family tree to Rome.'] },
] },
{ g:'institutions', n:['大学','The University'], stops:[
  { y:1088, l:'eu', t:['博洛尼亚','Bologna'], d:['学生们凑钱雇老师讲法律,自发结成行会——「大学」(universitas)这个词,原意就是「行会、共同体」。','Students pool money to hire law teachers and band into a guild — \'universitas\' means exactly that.'] },
  { y:1200, l:'eu', t:['巴黎与牛津','Paris and Oxford'], d:['巴黎、牛津相继成形,学位、学院、辩论课的样式定了下来,八百年没有大变。','Paris and Oxford follow; degrees, colleges and disputations set a shape that barely changes for eight hundred years.'] },
  { y:1810, l:'eu', t:['柏林:研究型大学','Berlin: the research university'], d:['洪堡把「教学与研究合一」写进柏林大学——大学从传授知识的地方,变成生产知识的地方。','Humboldt\'s Berlin unites teaching with research — the university starts producing knowledge, not just passing it on.'] },
  { y:1900, l:'am', t:['铺向全球','Worldwide'], d:['美国把研究型大学做到最大规模,东亚各国也把它引了回去——今天世界各地的大学,大多沿用这套欧洲式样。','America scales the model and East Asia adopts it — most universities worldwide still follow this European template.'] },
] },
{ g:'goods', n:['丝绸','Silk'], stops:[
  { y:-100, l:'ea', t:['中国的秘密','China\'s secret'], d:['中国养蚕缫丝几千年,技术一直是机密;张骞打通商路之后,丝绸成了西去驼队最值钱的货。','China had reeled silk for millennia and guarded the craft; after Zhang Qian opened the road, silk was the caravans\' costliest cargo.'] },
  { y:100, l:'eu', t:['罗马的丝绸热','Rome\'s silk fever'], d:['罗马贵族为丝绸一掷千金,元老院一度下令禁止男子穿丝绸——没禁住。','Roman elites paid fortunes for it; the Senate banned it for men as ruinous and immodest — in vain.'] },
  { y:552, l:'eu', t:['蚕种到君士坦丁堡','Silkworms reach Constantinople'], d:['传说僧人把蚕种藏进竹杖带给拜占庭——与「蚕种西传」讲的是同一个故事,秘密就此出关。','Monks are said to smuggle eggs to Byzantium in bamboo staves — the secret is out at last.'] },
  { y:1300, l:'eu', t:['意大利织机','Italian looms'], d:['卢卡、威尼斯的丝坊兴起,欧洲开始自己织丝;而「丝绸之路」这个名字,是 19 世纪的学者回头起的。','Lucca and Venice weave their own; the name \'Silk Road\' itself was coined by a scholar only in the 19th century.'] },
] },
{ g:'goods', n:['白银的全球环流','Silver Goes Global'], stops:[
  { y:1545, l:'am', t:['波托西银山','The silver mountain of Potosí'], d:['安第斯高原发现当时世界最大的银矿;矿工多是被征发的原住民,矿山吞噬了无数人命。','The greatest silver lode of the age is found at Potosí; conscripted native miners pay a terrible price.'] },
  { y:1571, l:'se', t:['马尼拉大帆船','The Manila galleons'], d:['西班牙帆船把美洲白银运到马尼拉,换中国的丝绸与瓷器——太平洋两岸第一次被一条固定航线连了起来。','Spanish galleons carry American silver to Manila for Chinese silk and porcelain — the Pacific\'s first regular trade route.'] },
  { y:1581, l:'ea', t:['白银流入明朝','Silver flows to Ming China'], d:['明朝把赋税折成白银来收(一条鞭法),全国都要用银——世界的白银于是滚滚流向中国。','The Ming converts its taxes to silver (the Single Whip reform); the world\'s silver flows toward China.'] },
  { y:1600, l:'eu', t:['欧洲物价革命','Europe\'s Price Revolution'], d:['白银同样涌入欧洲,物价翻着番涨了一个世纪——史家称之为「物价革命」。','Silver floods Europe too, and prices climb for a century — historians call it the Price Revolution.'] },
] },
{ g:'people', n:['波利尼西亚大扩散','The Polynesian Expansion'], stops:[
  { y:-3000, l:'ea', t:['从台湾出发','Setting out from Taiwan'], d:['南岛语族的最深根系在台湾——今天全世界一千二百多种南岛语言里,分歧最大的几支都在这座岛上,语言学上这通常意味着源头。也有学者主张源头更靠南、过程更缓,争论未定。','The deepest roots of the Austronesian languages are in Taiwan: of the twelve hundred-odd Austronesian languages alive today, the most divergent branches are all on that one island, which in linguistics usually marks the homeland. Some scholars argue for a source further south and a slower process; it is not settled.'] },
  { y:-1500, l:'se', t:['穿过岛屿东南亚','Through island Southeast Asia'], d:['菲律宾、婆罗洲、苏拉威西一路向南向东。船是带舷外浮杆的独木舟,货是猪、狗、鸡与芋头山药——他们不是去看看,是去住下。','South and east through the Philippines, Borneo and Sulawesi. The boats carried outriggers and the cargo was pigs, dogs, chickens, taro and yam — they were not going to look, they were going to stay.'] },
  { y:-1000, l:'oc', t:['拉皮塔抵达斐济','Lapita reaches Fiji'], d:['带齿印花纹的陶器从俾斯麦群岛一路铺到瓦努阿图、新喀里多尼亚与斐济,只用了几百年。这一段他们与已在此住了几万年的美拉尼西亚人混居通婚。','The dentate-stamped pottery spread from the Bismarck Archipelago to Vanuatu, New Caledonia and Fiji in only a few centuries. Along this stretch they settled among, and married into, Melanesians who had been there for tens of thousands of years.'] },
  { y:-800, l:'oc', t:['汤加与萨摩亚:停','Tonga and Samoa: the pause'], d:['再往东是从没有人去过的海。扩散在这里停了约一千八百年——为什么停、为什么又重新开始,是太平洋考古最大的未解问题之一。','East of here lay a sea no human had crossed. The expansion stopped for some eighteen hundred years — why it stopped and why it started again is one of the great open questions of Pacific archaeology.'] },
  { y:700, l:'af', t:['另一支向西:马达加斯加','The other branch, west to Madagascar'], d:['同一个语族的另一支沿着印度洋一路向西,在公元500至800年间抵达非洲东岸外的马达加斯加。今天马达加斯加语仍属南岛语族,最近的亲戚在婆罗洲——隔着六千公里的大洋。','Another branch of the same family sailed west across the Indian Ocean and reached Madagascar, off the coast of Africa, between about 500 and 800. Malagasy is still an Austronesian language and its closest relatives are in Borneo, six thousand kilometres of ocean away.'], p:1 },
  { y:1000, l:'oc', t:['东波利尼西亚','East Polynesia'], d:['停顿结束,社会群岛与马克萨斯群岛先后有人。往后三百年,人类把太平洋上几乎每一个能住的点都找到了。','The pause ended and the Society and Marquesas Islands were settled. Over the next three hundred years people found very nearly every habitable speck in the Pacific.'], p:3 },
  { y:1200, l:'oc', t:['拉帕努伊','Rapa Nui'], d:['复活节岛离最近的有人岛还有两千公里、离最近的大陆三千五百公里,是世界上最偏远的定居点之一。能找到这么小的一个点,是这套导航术的极限。','Easter Island lies two thousand kilometres from the nearest inhabited land and 3,500 from any continent, one of the remotest settlements on earth. Finding a target that small is the limit of what this navigation could do.'] },
  { y:1300, l:'oc', t:['奥特亚罗瓦收尾','Aotearoa, the last'], d:['新西兰是地球上最后一块被人类住上的大片陆地。从台湾算起,这次扩散走了四千多年、横跨半个地球——1976年复原的双体舟只靠传统导航从夏威夷航抵塔希提,证明它当年确实做得到。','New Zealand was the last sizeable land on earth that people moved into. Counted from Taiwan the expansion took over four thousand years and crossed half the globe — and in 1976 a rebuilt double canoe sailed from Hawaii to Tahiti by traditional navigation alone, proving it could be done.'] },
] },
{ g:'people', n:['印欧语系的扩散','The Indo-European Expansion'], stops:[
  { y:-3300, l:'st', t:['黑海北岸的草原','The steppe north of the Black Sea'], d:['今天从冰岛到孟加拉,大约一半的人说的话都是亲戚——英语的 three、拉丁语的 tres、梵语的 trayas 是同一个词。语言学家把这一大家子叫印欧语系,把它们共同的老家定在黑海与里海之间的草原:那里的颜那亚人有马、有带轮子的大车,能把家搬着走。','From Iceland to Bengal, about half the people alive speak related languages — English three, Latin tres and Sanskrit trayas are the same word. Linguists call the family Indo-European and place its homeland on the steppe between the Black Sea and the Caspian, where the Yamnaya had horses and wheeled wagons and could carry their homes with them.'] },
  { y:-2900, l:'eu', t:['走进欧洲','Into Europe'], d:['草原人群向西进入中欧,考古上对应绳纹器文化。他们带来的不只是语言:2015年两组古 DNA 研究发现,中欧人群的血统在这几百年里发生了大规模更替,不是少数人来教了个新说法,是很多人搬了过来。','The steppe people moved west into central Europe, which archaeology knows as the Corded Ware culture. They brought more than a language: two ancient-DNA studies in 2015 found the ancestry of central Europeans was largely replaced over these few centuries — not a few newcomers teaching a new way of speaking, but a great many people moving in.'], p:0 },
  { y:-2000, l:'st', t:['辛塔什塔:最早的战车','Sintashta: the first chariots'], d:['乌拉尔山南麓的辛塔什塔遗址出土了目前所知最早的辐条轮战车,连马一起埋在墓里。轻、快、能转弯的战车此后一千年里是各地的决胜兵器,从赫梯到商朝都在用——这一次是技术随着人一起走。','At Sintashta on the southern flank of the Urals lie the earliest known chariots with spoked wheels, buried in graves along with the horses. Light, fast and able to turn, the chariot was the decisive weapon for the next thousand years, from the Hittites to Shang China — here the technology travelled with the people.'], p:0 },
  { y:-1650, l:'me', t:['赫梯:第一份写下来的印欧语','Hittite: the first Indo-European written down'], d:['赫梯人在安纳托利亚用楔形文字把自己的话刻在泥板上,这是现存最早的印欧语文献,比《梨俱吠陀》被写定还早得多。它1915年被释读之后,整个语系的年表都得重排——最古老的一支不在欧洲,也不在印度。','The Hittites wrote their language on clay tablets in cuneiform in Anatolia, and those are the oldest surviving Indo-European texts, far older than the date the Rigveda was written down. When they were deciphered in 1915 the whole family tree had to be redrawn: the oldest branch was neither in Europe nor in India.'], p:0 },
  { y:-1500, l:'sa', t:['走进南亚','Into South Asia'], d:['印度河城市衰落之后,说印欧语的人群分批从中亚南下,与本地居民混居,《梨俱吠陀》的颂诗在此后几百年里口耳相传。他们在诗里自称 ārya(雅利安),那本来只是「我们这些人」的意思——三千年后欧洲有人把这个词拿去编种族神话,那是另外一回事,和这里说的语言亲缘毫无关系。','After the Indus cities declined, Indo-European speakers came south from Central Asia in waves and settled among the people already there, and the hymns of the Rigveda were carried by memory for centuries afterwards. In those hymns they call themselves ārya, which simply meant our people — three thousand years later some in Europe took the word to build a racial myth, which is a separate matter altogether and has nothing to do with the language kinship described here.'], p:2 },
  { y:600, l:'st', t:['最东的一支:吐火罗语','The easternmost branch: Tocharian'], d:['塔里木盆地的佛经译本里,写着一种谁也没想到会出现在这里的印欧语——吐火罗语,而且它更像西边的凯尔特语、拉丁语,不像近在咫尺的印度语。顺带纠正一个流行说法:塔里木的干尸曾被广泛认作吐火罗人,2021年的古 DNA 显示他们其实是当地的古老人群,不是从草原迁来的。','In Buddhist translations from the Tarim Basin sits an Indo-European language nobody expected to find there — Tocharian, and it patterns more like Celtic and Latin far to the west than like the Indian languages next door. One popular claim needs correcting: the Tarim mummies were long taken for Tocharians, but ancient DNA in 2021 showed they were a local, very old population rather than migrants off the steppe.'], p:0 },
  { y:1786, l:'sa', t:['加尔各答的一次演讲','A lecture in Calcutta'], d:['英国法官威廉·琼斯在加尔各答讲道:梵语与希腊语、拉丁语相似到不可能是巧合,三者必定同出一源。他不是第一个注意到的人,但这次演讲之后,追查这门亲缘关系成了一门学问——只靠比较词语和语法,人们复原出一种从没有人写下来过的语言。','In Calcutta the English judge William Jones argued that Sanskrit resembles Greek and Latin too closely for accident, and that all three must have sprung from a common source. He was not the first to notice it, but after that lecture tracing the kinship became a discipline — and by comparing words and grammar alone, scholars reconstructed a language nobody had ever written down.'], p:4 },
  { y:2015, l:'eu', t:['古 DNA 出场','Ancient DNA arrives'], d:['两百年里,草原起源说与安纳托利亚农业起源说争执不下。2015年古 DNA 给草原说加上了重重一码:大规模人群迁徙确实发生过。但事情没有就此了结——2023年又有研究提出高加索以南更早的源头加上后来的草原扩散,是个混合模型。老家究竟在哪,今天仍在争。','For two centuries the steppe origin and an Anatolian farming origin were argued back and forth. In 2015 ancient DNA put heavy weight behind the steppe: a large-scale migration really did happen. It did not end there — a 2023 study proposed a hybrid picture, an earlier source south of the Caucasus plus the later steppe spread. Where the homeland was is still being argued.'], p:6 },
] },
];
