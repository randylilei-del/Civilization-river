/* ---------- 鼎盛区间(按文明名索引;中国各朝的 gl 内联在 CIVS 中) ---------- */
const GL = {
'古希腊': [
 { a:-470, b:-320, k:'thought', t:['哲学黄金期','Golden age of philosophy'], d:['苏格拉底、柏拉图、亚里士多德三代师承。','Socrates, Plato, Aristotle - three generations.'] },
 { a:-480, b:-400, k:'art', t:['悲剧与帕特农','Tragedy & the Parthenon'], d:['三大悲剧家与雅典卫城同代。','The great tragedians and the Acropolis in one lifetime.'] } ],
'罗马帝国': [
 { a:-27, b:180, k:'econ', t:['罗马和平','Pax Romana'], d:['地中海贸易一体化,两百年繁荣。','Two centuries of integrated Mediterranean trade.'] },
 { a:-27, b:150, k:'tech', t:['工程时代','Engineering age'], d:['道路、引水渠、混凝土穹顶。','Roads, aqueducts, concrete domes.'] },
 { a:100, b:235, k:'thought', t:['法学家时代','The great jurists'], d:['罗马法体系成形,泽被后世大陆法。','Roman law systematized - the root of civil law.'] } ],
'拜占庭': [
 { a:528, b:565, k:'thought', t:['查士丁尼法典','Justinian codification'], d:['罗马法大全,欧洲法学的底本。','The Corpus Juris, foundation of European law.'] },
 { a:867, b:1056, k:'art', t:['马其顿文艺复兴','Macedonian Renaissance'], d:['圣像艺术与古典学问复兴。','Icons and classical learning revive.'] } ],
'阿拉伯哈里发': [
 { a:780, b:900, k:'thought', t:['翻译运动','Translation movement'], d:['希腊波斯印度典籍尽入阿拉伯语。','Greek, Persian and Indian learning rendered into Arabic.'] },
 { a:800, b:1000, k:'tech', t:['代数与天文','Algebra & astronomy'], d:['花剌子米的代数,天文台与星表。','Al-Khwarizmi, observatories, star tables.'] },
 { a:750, b:950, k:'econ', t:['两洋枢纽','Hub of two seas'], d:['印度洋与地中海贸易在巴格达汇流。','Indian Ocean and Mediterranean trade meet at Baghdad.'] } ],
'奥斯曼帝国': [
 { a:1450, b:1600, k:'econ', t:['三洲商路','Tri-continental trade'], d:['东西商路税关尽在其手。','The tolls of East-West trade in one hand.'] },
 { a:1520, b:1600, k:'art', t:['希南建筑时代','Age of Sinan'], d:['苏莱曼尼耶清真寺群,奥斯曼美学定型。','The Suleymaniye and the classical Ottoman style.'] } ],
'波斯(阿契美尼德)': [ { a:-520, b:-400, k:'econ', t:['御道与贡赋','Royal Road economy'], d:['二十行省贡赋与驿传体系。','Tribute and post-roads across twenty satrapies.'] } ],
'古埃及': [
 { a:-2600, b:-2400, k:'tech', t:['金字塔工程','Pyramid engineering'], d:['吉萨群像:古代最大工程。','Giza, antiquity\'s greatest works.'] },
 { a:-1550, b:-1150, k:'art', t:['神庙时代','Temple age'], d:['卡纳克、卢克索与帝王谷。','Karnak, Luxor, the Valley of the Kings.'] } ],
'苏美尔·阿卡德': [ { a:-3300, b:-2900, k:'tech', t:['文字与历法','Writing & calendar'], d:['楔形文字、六十进制、阴历。','Cuneiform, base-60, the lunar calendar.'] } ],
'笈多王朝': [
 { a:380, b:500, k:'tech', t:['零与天文','Zero & astronomy'], d:['阿耶波多:地球自转与位值记数。','Aryabhata: rotation of the earth, place-value numerals.'] },
 { a:380, b:470, k:'art', t:['梵语古典','Sanskrit classics'], d:['迦梨陀娑的戏剧与长诗。','Kalidasa\'s dramas and epics.'] } ],
'莫卧儿帝国': [
 { a:1560, b:1660, k:'art', t:['泰姬陵与细密画','Taj & miniatures'], d:['印度-波斯美学的合流。','Indo-Persian aesthetics converge.'] },
 { a:1580, b:1700, k:'econ', t:['棉纺织出口','Cotton exports'], d:['印度棉布行销全球。','Indian cottons clothe the world.'] } ],
'文艺复兴意大利': [
 { a:1400, b:1500, k:'econ', t:['银行与商业','Banking & commerce'], d:['美第奇银行与复式记账。','The Medici bank and double-entry books.'] },
 { a:1480, b:1530, k:'art', t:['盛期文艺复兴','High Renaissance'], d:['达芬奇、米开朗基罗、拉斐尔同城竞技。','Leonardo, Michelangelo and Raphael in rivalry.'] } ],
'西班牙·葡萄牙帝国': [
 { a:1545, b:1640, k:'econ', t:['白银世纪','The silver century'], d:['波托西白银撑起第一个全球贸易循环。','Potosi silver powers the first global loop.'] },
 { a:1580, b:1660, k:'art', t:['黄金世纪','Siglo de Oro'], d:['塞万提斯与委拉斯开兹的时代。','The age of Cervantes and Velazquez.'] } ],
'荷兰共和国': [
 { a:1600, b:1670, k:'econ', t:['黄金时代','Golden Age'], d:['人均财富冠绝欧洲的商业共和国。','The richest people in Europe.'] },
 { a:1630, b:1670, k:'art', t:['伦勃朗与维米尔','Rembrandt & Vermeer'], d:['市民肖像与光影的巅峰。','Burgher portraits, mastery of light.'] } ],
'法兰西': [
 { a:1720, b:1789, k:'thought', t:['启蒙运动','The Enlightenment'], d:['伏尔泰、卢梭、百科全书派。','Voltaire, Rousseau, the Encyclopedistes.'] },
 { a:1860, b:1910, k:'art', t:['印象派时代','Impressionist era'], d:['巴黎是世界艺术之都。','Paris, capital of art.'] } ],
'大英帝国·英国': [
 { a:1687, b:1727, k:'thought', t:['牛顿时代','Age of Newton'], d:['《原理》奠定经典物理。','The Principia founds classical physics.'] },
 { a:1770, b:1850, k:'tech', t:['工业革命','Industrial Revolution'], d:['蒸汽、铁路、工厂制。','Steam, rail, the factory system.'] },
 { a:1815, b:1914, k:'econ', t:['全球贸易金融','Global trade & finance'], d:['英镑与伦敦城是世界结算中枢。','Sterling and the City clear the world\'s trade.'] } ],
'美国': [
 { a:1876, b:1915, k:'tech', t:['发明时代','Age of invention'], d:['电灯、电话、汽车、飞机接连问世。','Light, telephone, car, airplane.'] },
 { a:1945, b:1973, k:'econ', t:['战后繁荣','Postwar boom'], d:['中产时代与布雷顿森林体系。','The middle-class era under Bretton Woods.'] },
 { a:1970, b:2025, k:'tech', t:['信息革命','Information revolution'], d:['从芯片到互联网到 AI。','Chips to Internet to AI.'] } ],
'日本': [
 { a:1760, b:1850, k:'art', t:['浮世绘','Ukiyo-e'], d:['北斋广重,后来震动欧洲画坛。','Hokusai and Hiroshige, later shaking Europe.'] },
 { a:1955, b:1990, k:'econ', t:['经济奇迹','Economic miracle'], d:['从废墟到世界第二。','Ruins to the world\'s second economy.'] },
 { a:1980, b:2025, k:'art', t:['动漫与游戏','Anime & games'], d:['全球流行文化的重要一极。','A pole of global pop culture.'] } ],
'俄罗斯·苏联': [
 { a:1820, b:1880, k:'art', t:['文学黄金时代','Literary golden age'], d:['普希金到托尔斯泰、陀思妥耶夫斯基。','Pushkin to Tolstoy and Dostoevsky.'] },
 { a:1957, b:1975, k:'tech', t:['太空竞赛','Space race'], d:['卫星与加加林先拔头筹。','Sputnik and Gagarin lead first.'] } ],
'玛雅': [ { a:250, b:900, k:'tech', t:['历法与天文','Calendar & astronomy'], d:['长纪历精于儒略历。','The Long Count outdoes the Julian year.'] } ],
'印加': [ { a:1440, b:1530, k:'tech', t:['道路与农业工程','Roads & terraces'], d:['约三万公里驿道与高山梯田。','Some 30,000 km of roads, mountain terraces.'] } ],
'高棉·吴哥': [ { a:1110, b:1220, k:'art', t:['吴哥建筑巅峰','Angkor at its height'], d:['吴哥窟与巴戎寺。','Angkor Wat and the Bayon.'] } ],
'商': [
 { a:-1300, b:-1046, k:'tech', t:['青铜范铸','Piece-mould bronze'], d:['后母戊鼎重八百余公斤,一次浇铸而成。','The 830 kg Houmuwu ding, cast in one pour.'] },
 { a:-1250, b:-1046, k:'thought', t:['甲骨占卜','Oracle-bone divination'], d:['成熟的汉字体系,连同王室的每一次问卜。','A mature script — and every royal question recorded.'] } ],
'西周': [ { a:-1040, b:-841, k:'thought', t:['礼乐制度','Rites and music'], d:['周公制礼作乐,后世儒家反复回望的源头。','Zhou Gong\'s order, the model Confucians looked back to.'] } ],
'秦': [ { a:-221, b:-210, k:'tech', t:['标准化工程','Standardization'], d:['文字、度量衡、车轨、律令,一次性统一。','Script, weights, axle-width and law — unified at a stroke.'] } ],
'东汉': [
 { a:100, b:140, k:'tech', t:['造纸与浑天仪','Paper and the armillary sphere'], d:['蔡伦的纸与张衡的仪器同代出现。','Cai Lun\'s paper and Zhang Heng\'s instruments, one generation.'] },
 { a:67, b:200, k:'thought', t:['经学与佛教东传','Classics, and Buddhism arrives'], d:['白马寺建成,今古文经学并盛。','The White Horse Temple rises as the classics are argued.'] } ],
'三国': [ { a:240, b:263, k:'thought', t:['竹林七贤','Seven Sages of the Bamboo Grove'], d:['乱世里的清谈与玄学,士人转向内心。','In chaos, pure conversation — scholars turn inward.'] } ],
'南北朝': [
 { a:460, b:530, k:'art', t:['石窟造像','The cave temples'], d:['云冈与龙门,犍陀罗样式渐变成中国面孔。','At Yungang and Longmen, Gandharan forms turn Chinese.'] },
 { a:420, b:589, k:'thought', t:['佛教中国化','Buddhism becomes Chinese'], d:['南朝四百八十寺,译经与义学并起。','Four hundred eighty temples, and a translation boom.'] } ],
'隋': [ { a:605, b:618, k:'econ', t:['运河与仓储','Canal and granaries'], d:['南粮北运的通道,唐宋两朝继续吃红利。','The grain artery Tang and Song lived off.'] } ],
'五代十国': [ { a:907, b:979, k:'art', t:['山水画定型','Landscape painting takes form'], d:['荆浩关仝董源巨然,中国山水的四座源头。','Four masters set the shape of Chinese landscape.'] } ],
'辽': [ { a:1000, b:1125, k:'art', t:['佛塔与壁画','Pagodas and murals'], d:['应县木塔高六十七米,无一钉铆,立至今日。','The 67 m Yingxian pagoda: no nails, still standing.'] } ],
'西夏': [ { a:1038, b:1227, k:'thought', t:['西夏文与译经','A script of its own'], d:['自创六千余字,用来翻译整部佛藏。','Six thousand invented characters, used to render the canon.'] } ],
'金': [ { a:1150, b:1234, k:'art', t:['院本与诸宫调','Court farce and ballad-drama'], d:['元杂剧的直接前身,《西厢》故事在此成型。','The direct ancestor of Yuan drama.'] } ],
'元': [
 { a:1279, b:1368, k:'art', t:['元曲杂剧','Yuan drama'], d:['关汉卿《窦娥冤》,市井舞台的黄金期。','Guan Hanqing\'s tragedies — theatre for the streets.'] },
 { a:1276, b:1300, k:'tech', t:['天文与水利','Astronomy and waterworks'], d:['郭守敬造仪、测影、修历、通渠。','Guo Shoujing: instruments, observations, calendar, canals.'] },
 { a:1271, b:1330, k:'econ', t:['欧亚大通道','The Eurasian corridor'], d:['驿站相连,泉州港与海运同时鼎盛。','Post roads inland, Quanzhou\'s harbour at sea.'] } ],
'朝鲜半岛诸王朝': [
 { a:1150, b:1250, k:'art', t:['高丽青瓷','Goryeo celadon'], d:['翡色镶嵌,当时中国人也推为第一。','Kingfisher-green inlay, rated first even in China.'] },
 { a:1234, b:1450, k:'tech', t:['金属活字与谚文','Metal type and Hangul'], d:['金属活字早于古腾堡两百年;世宗造字给百姓用。','Metal type 200 years before Gutenberg; an alphabet for commoners.'] } ],
'韩国': [
 { a:1962, b:1997, k:'econ', t:['汉江奇迹','Miracle on the Han'], d:['三十五年从农业国到工业强国。','Farm country to industrial power in thirty-five years.'] },
 { a:1997, b:2025, k:'art', t:['韩流','The Korean Wave'], d:['影视与流行音乐成为出口产业。','Screen and pop music become exports.'] } ],
'民国': [ { a:1915, b:1927, k:'thought', t:['新文化运动','New Culture Movement'], d:['白话文取代文言,德先生与赛先生登场。','Vernacular replaces classical; Democracy and Science arrive.'] } ],
'米诺斯·迈锡尼': [ { a:-1700, b:-1450, k:'art', t:['克诺索斯壁画','Knossos frescoes'], d:['海豚、跳牛与明快的蓝,与埃及的庄严相反。','Dolphins, bull-leapers, bright blue — the anti-Egypt.'] } ],
'中世纪西欧': [
 { a:1140, b:1300, k:'art', t:['哥特式教堂','Gothic cathedrals'], d:['尖拱与飞扶壁把墙让给彩色玻璃。','Pointed arch and flying buttress trade wall for glass.'] },
 { a:1150, b:1300, k:'thought', t:['大学与经院哲学','Universities and scholasticism'], d:['博洛尼亚、巴黎、牛津成型,阿奎那调和信仰与理性。','Bologna, Paris, Oxford; Aquinas weds faith to reason.'] } ],
'德意志': [
 { a:1900, b:1933, k:'thought', t:['物理学之都','Capital of physics'], d:['普朗克、爱因斯坦与哥廷根学派,直到人才流散。','Planck, Einstein, Gottingen — until the exodus.'] },
 { a:1950, b:1990, k:'econ', t:['经济奇迹','The Wirtschaftswunder'], d:['废墟上重建欧洲第一工业国。','Europe\'s first industrial power, rebuilt from rubble.'] } ],
'赫梯': [ { a:-1400, b:-1200, k:'tech', t:['铁器与战车','Iron and chariots'], d:['最早成规模用铁,轻型战车纵横近东。','The first at scale with iron; light chariots rule the Near East.'] } ],
'迦太基': [ { a:-600, b:-264, k:'econ', t:['西地中海商网','Western Mediterranean network'], d:['从西班牙银矿到北非谷仓,一张海上账本。','From Spanish silver to African grain, one seaborne ledger.'] } ],
'希腊化王朝': [ { a:-300, b:-150, k:'tech', t:['亚历山大里亚科学','Alexandrian science'], d:['欧几里得的几何、阿基米德的力学、地球周长的测算。','Euclid\'s geometry, Archimedes\' mechanics, the Earth measured.'] } ],
'帕提亚·萨珊': [
 { a:100, b:600, k:'econ', t:['丝路中段','The middle Silk Road'], d:['东西货物必经其手,转口即是国策。','All East-West goods pass through — brokerage as policy.'] },
 { a:240, b:400, k:'thought', t:['琐罗亚斯德与摩尼','Zoroaster and Mani'], d:['国教确立,同时诞生一个横跨欧亚的新信仰。','A state church — and a new faith that spread both ways.'] } ],
'塞尔柱突厥': [ { a:1065, b:1150, k:'thought', t:['内扎米亚学院','The Nizamiyya schools'], d:['官办学院体系成型,安萨里在此讲学。','State-funded colleges; al-Ghazali taught here.'] } ],
'伊尔汗国': [ { a:1259, b:1310, k:'tech', t:['马拉盖天文台','Maragheh observatory'], d:['图西的行星模型,后来出现在哥白尼书里。','Tusi\'s planetary models resurface in Copernicus.'] } ],
'萨法维·波斯': [ { a:1590, b:1666, k:'art', t:['伊斯法罕','Isfahan'], d:['"伊斯法罕半天下"——广场、蓝穹与花园城。','"Isfahan is half the world": squares, blue domes, gardens.'] } ],
'蒙古帝国': [ { a:1240, b:1330, k:'econ', t:['驿站与欧亚贸易','The yam and Eurasian trade'], d:['一套驿传把太平洋接到地中海。','One post system links the Pacific to the Mediterranean.'] } ],
'帖木儿帝国': [
 { a:1417, b:1449, k:'tech', t:['撒马尔罕天文台','Samarkand observatory'], d:['兀鲁伯星表的精度,两百年内无人超越。','Ulugh Beg\'s tables stood unbeaten for two centuries.'] },
 { a:1400, b:1500, k:'art', t:['帖木儿细密画','Timurid miniatures'], d:['赫拉特画派,后来的波斯与莫卧儿都从这里学。','The Herat school, teacher to Persia and the Mughals.'] } ],
'突厥汗国': [ { a:720, b:744, k:'thought', t:['突厥文字','The Orkhon script'], d:['鄂尔浑碑铭:草原民族第一次用自己的文字写自己。','The steppe writes its own history for the first time.'] } ],
'印度河文明': [ { a:-2500, b:-1900, k:'tech', t:['城市规划与排水','City grids and drains'], d:['统一砖尺、直角街道、家家有下水道。','Standard bricks, right-angle streets, drains in every house.'] } ],
'吠陀时代': [ { a:-1200, b:-600, k:'thought', t:['吠陀与奥义书','Vedas and Upanishads'], d:['口传数百年不失一字,再转向"我是谁"。','Centuries of flawless oral transmission, then: who am I?'] } ],
'孔雀王朝': [
 { a:-528, b:-400, k:'thought', t:['沙门思潮','The shramana ferment'], d:['佛教与耆那教同时兴起,挑战婆罗门。','Buddhism and Jainism rise together against the Brahmins.'] },
 { a:-268, b:-232, k:'thought', t:['阿育王护法','Ashoka\'s dharma'], d:['石柱诏令刻满帝国,使团远至希腊化诸王。','Edicts across the empire, envoys to the Greek kings.'] } ],
'贵霜帝国': [
 { a:100, b:250, k:'art', t:['犍陀罗艺术','Gandharan art'], d:['最早的一批佛像出自犍陀罗与秣菟罗,东亚佛像的祖型。','The earliest Buddha images, from Gandhara and Mathura.'] },
 { a:100, b:200, k:'thought', t:['大乘北传','Mahayana heads north'], d:['经丝路进入中国,此后两千年的东亚底色。','Along the Silk Road into China, and East Asia is changed.'] } ],
'朱罗王朝': [
 { a:1000, b:1070, k:'econ', t:['印度洋海权','Sea power in the Indian Ocean'], d:['远征三佛齐,商船直抵中国。','Fleets strike Srivijaya; merchants reach China.'] },
 { a:985, b:1070, k:'art', t:['青铜与石庙','Bronzes and stone temples'], d:['舞王湿婆像与坦贾武尔大庙。','The dancing Shiva and the Thanjavur temple.'] } ],
'德里苏丹国': [ { a:1206, b:1350, k:'art', t:['印度-伊斯兰建筑','Indo-Islamic architecture'], d:['顾特卜塔:波斯的拱与印度的石匠。','The Qutb Minar: Persian arch, Indian masons.'] } ],
'英属印度': [ { a:1853, b:1900, k:'tech', t:['铁路与电报','Railways and telegraph'], d:['为统治铺的网,后来成了独立运动的血管。','Built to rule; later the arteries of independence.'] } ],
'三佛齐': [
 { a:700, b:1100, k:'econ', t:['海峡枢纽','Gatekeeper of the Straits'], d:['所有往来中国与印度的船都要在此停靠。','Every ship between China and India put in here.'] },
 { a:671, b:1000, k:'thought', t:['佛学中心','A Buddhist centre'], d:['义净在此留学,称僧众逾千。','Yijing studied here among a thousand monks.'] } ],
'满者伯夷': [ { a:1350, b:1400, k:'econ', t:['群岛贸易网','The archipelago network'], d:['香料从产地经爪哇转口全亚洲。','Spices leave the islands through Java for all Asia.'] } ],
'库施·努比亚': [ { a:-750, b:-350, k:'econ', t:['尼罗河的金与铁','Nile gold and iron'], d:['麦罗埃的冶铁炉与埃及的黄金来源。','Meroe\'s furnaces, and where Egypt\'s gold came from.'] } ],
'阿克苏姆': [ { a:300, b:600, k:'econ', t:['红海贸易','Red Sea trade'], d:['自铸金币,与罗马波斯印度三方通商。','Its own gold coinage, trading with Rome, Persia and India.'] } ],
'加纳帝国': [ { a:800, b:1150, k:'econ', t:['黄金换食盐','Gold for salt'], d:['南方的金与撒哈拉的盐,等重交换。','Southern gold and Saharan salt, weight for weight.'] } ],
'斯瓦希里城邦': [ { a:1200, b:1500, k:'econ', t:['季风贸易','The monsoon trade'], d:['借季风往返阿拉伯与印度,基尔瓦富甲一方。','Riding the monsoon to Arabia and India.'] } ],
'大津巴布韦': [ { a:1300, b:1450, k:'econ', t:['内陆黄金','Inland gold'], d:['无灰浆干砌石墙,黄金经东岸出海。','Mortarless stone walls; gold flowing to the coast.'] } ],
'桑海帝国': [ { a:1470, b:1590, k:'thought', t:['廷巴克图学术','Timbuktu\'s scholars'], d:['桑科雷学院与数以万计的手抄本。','The Sankore madrasa and tens of thousands of manuscripts.'] } ],
'特奥蒂瓦坎': [ { a:150, b:450, k:'tech', t:['棋盘城市','The grid city'], d:['十万人口,街道正交,公寓式院落。','A hundred thousand people in planned apartment compounds.'] } ],
'阿兹特克': [ { a:1440, b:1519, k:'econ', t:['特拉特洛尔科市场','The great market'], d:['西班牙人说他们从没见过这么大的集市。','The Spaniards said they had never seen its like.'] } ],
'百乘王朝': [
 { a:1, b:200, k:'econ', t:['印度洋罗马贸易','Rome across the Indian Ocean'], d:['季风直航埃及,南印出土的罗马金币多在此时。','Monsoon runs to Egypt; most Roman gold in south India dates here.'] },
 { a:100, b:220, k:'art', t:['阿马拉瓦蒂佛教艺术','The Amaravati school'], d:['与犍陀罗并立的另一支源流,人物柔软流动。','A second source alongside Gandhara — softer, in motion.'] } ],
'刚果王国': [ { a:1491, b:1570, k:'thought', t:['文字与外交','Letters and diplomacy'], d:['受洗的国王用拉丁文与欧洲君主通信,刚果语也开始书写。','A baptized king writing Latin to Europe; Kikongo first put on paper.'] } ],
'查文文化': [
 { a:-700, b:-300, k:'art', t:['查文风格','The Chavin style'], d:['人、猫科与蛇交缠的图像传遍海岸与山地。','Human, cat and serpent entwined, from coast to highland.'] },
 { a:-500, b:-300, k:'tech', t:['冶金与纺织','Metalwork and weaving'], d:['金银合金焊接与提花织机,此后一直用到印加。','Soldered gold-silver alloys and the patterned loom, still used by the Inca.'] } ],
'奥尔梅克': [ { a:-1000, b:-600, k:'art', t:['巨石头像','The colossal heads'], d:['数十吨玄武岩,从上百公里外运来。','Tens of tonnes of basalt, hauled a hundred kilometres.'] } ],
'腓尼基': [ { a:-1050, b:-800, k:'tech', t:['字母文字','The alphabet'], d:['二十二个辅音字母,希腊、拉丁、阿拉伯全从这里分枝。','Twenty-two letters — parent of Greek, Latin and Arabic.'] } ],
'罗马治下近东': [ { a:30, b:325, k:'thought', t:['基督教成形','Christianity takes shape'], d:['从加利利的小群体到帝国承认的信仰,三百年。','From a Galilean sect to an imperial faith in three centuries.'] } ],
'现代中东': [ { a:1950, b:2025, k:'econ', t:['石油世纪','The oil century'], d:['地下资源把沙漠小邦推到世界经济的杠杆点。','Buried resources put desert states at the world\'s fulcrum.'] } ],
'斯基泰': [ { a:-600, b:-300, k:'art', t:['草原动物纹金器','Steppe animal-style gold'], d:['鹿、豹、格里芬盘绕成扣饰,随墓葬散落欧亚。','Deer, cats and griffins coiled into gold, from Hungary to Siberia.'] } ],
'匈奴': [ { a:-170, b:-60, k:'econ', t:['草原与绿洲的转口','Steppe-oasis brokerage'], d:['控制西域诸国的贡赋,与汉朝互市并行。','Tribute from the oasis states, plus border markets with Han.'] } ],
'粟特': [
 { a:400, b:750, k:'econ', t:['丝路商网','The Silk Road network'], d:['从撒马尔罕到长安,一路都有自己人的聚落。','Own colonies all the way from Samarkand to Chang\'an.'] },
 { a:550, b:750, k:'art', t:['片治肯特壁画','The Panjikent murals'], d:['商人宅邸的墙上画着史诗与宴饮,鲜艳如新。','Epics and banquets on merchants\' walls, still vivid.'] } ],
'柔然': [ { a:402, b:552, k:'thought', t:['可汗制度','The khagan institution'], d:['一个称号定义了此后一千年的草原君权。','One title defines steppe sovereignty for a thousand years.'] } ],
'萨曼王朝': [
 { a:900, b:999, k:'thought', t:['布哈拉学术圈','The Bukhara circle'], d:['伊本·西那与比鲁尼在同一片土地上同时出现。','Ibn Sina and al-Biruni, same soil, same generation.'] },
 { a:950, b:999, k:'art', t:['新波斯语文学','New Persian literature'], d:['《列王纪》让波斯的记忆没有断掉。','The Shahnameh keeps Persian memory unbroken.'] } ],
'喀喇汗王朝': [ { a:1000, b:1100, k:'thought', t:['突厥语的第一批书','The first books in Turkic'], d:['《福乐智慧》与《突厥语大词典》,一部讲怎么活,一部讲怎么说。','One on how to live, one on how to speak.'] } ],
'西辽·哈剌契丹': [ { a:1132, b:1211, k:'thought', t:['多信仰共治','Rule across faiths'], d:['佛教君主治穆斯林臣民,不强求改宗。','A Buddhist court over Muslim subjects, conversion not required.'] } ],
'哈萨克汗国': [ { a:1500, b:1700, k:'art', t:['口传史诗与冬不拉','Oral epic and the dombra'], d:['没有文字的年代,历史靠弹唱一代代传下去。','Before writing, history travelled by song.'] } ],
'布哈拉·希瓦·浩罕三汗国': [ { a:1500, b:1700, k:'thought', t:['经学院之城','City of madrasas'], d:['布哈拉一城的经学院数以百计,号称"伊斯兰之穹"。','Hundreds in Bukhara alone — "the dome of Islam".'] } ],
'回鹘': [ { a:757, b:840, k:'econ', t:['绢马贸易','Silk for horses'], d:['一匹马换四十匹绢,唐朝欠账到国库紧张。','Forty bolts of silk per horse — the Tang ran up a debt.'] } ],
'中世纪诸王朝': [ { a:700, b:1100, k:'art', t:['凿山为庙','Temples cut from the rock'], d:['埃洛拉的凯拉萨神庙自上而下整体凿出。','Kailasa at Ellora was carved downward out of one cliff.'] } ],
'印度·南亚诸国': [ { a:1991, b:2025, k:'tech', t:['软件与航天','Software and space'], d:['班加罗尔的外包产业,与低成本的探月探火。','Bangalore\'s outsourcing, and budget missions to Moon and Mars.'] } ],
'扶南': [ { a:150, b:500, k:'econ', t:['两洋之间的转口港','Port between two oceans'], d:['印度洋来的船在此卸货,换船再去南海。','Cargo from the Indian Ocean changed ships here for the China seas.'] } ],
'大越': [ { a:1075, b:1400, k:'thought', t:['科举与儒制','Examinations and Confucian rule'], d:['用中原的制度工具,守自己的独立。','Chinese statecraft, deployed to stay independent of China.'] } ],
'马六甲及诸苏丹国': [ { a:1400, b:1511, k:'econ', t:['香料转口港','The spice entrepot'], d:['八十四种语言在码头上同时响着。','Eighty-four languages were said to sound on its quays.'] } ],
'暹罗': [ { a:1351, b:1767, k:'thought', t:['上座部佛教王权','Theravada kingship'], d:['王是护法者也是功德最高者,寺院即学校。','The king as chief patron and merit-maker; the monastery as school.'] } ],
'现代东南亚': [ { a:1985, b:2025, k:'econ', t:['制造业接力','The factory relay'], d:['日本、四小龙、中国之后,产业链落到这里。','After Japan, the Tigers and China, the chain lands here.'] } ],
'三星堆·古蜀': [ { a:-1300, b:-1100, k:'art', t:['青铜神树与面具','Bronze trees and masks'], d:['一棵铜神树近四米高,纵目面具的眼球向外凸出十几厘米——样式在中国独一份。','A bronze tree nearly four metres tall, and masks whose eyes jut out a hand\'s width — nothing else in China looks like it.'] } ],
'二里头·夏': [ { a:-1700, b:-1600, k:'tech', t:['最早的青铜礼器','The first bronze ritual vessels'], d:['爵与绿松石龙形器:礼制在此有了实物。','Bronze jue cups and a turquoise dragon — ritual made tangible.'] } ],
'西晋': [ { a:266, b:300, k:'thought', t:['玄学与《三国志》','Mystic learning, and the Sanguozhi'], d:['清谈风起,陈寿同时写下最可靠的三国信史。','Pure conversation flourishes as Chen Shou writes the sober history.'] } ],
'马里帝国': [
 { a:1300, b:1400, k:'econ', t:['黄金之国','The land of gold'], d:['一度供应旧大陆近半黄金。','At one point nearly half the Old World\'s gold.'] },
 { a:1327, b:1450, k:'thought', t:['廷巴克图学统','Timbuktu\'s learning'], d:['清真寺即大学,手抄本世代相传。','Mosque as university; manuscripts passed down for generations.'] } ],
'现代非洲': [ { a:2007, b:2025, k:'econ', t:['跨越式移动支付','Leapfrogging to mobile money'], d:['没有铺开银行网,直接用手机结算。','No branch network needed — the phone is the bank.'] } ],
'瓦里·蒂瓦纳科': [ { a:700, b:1000, k:'tech', t:['高原农业工程','High-altitude farming'], d:['垄台田与梯田,让四千米高处也能养活城市。','Raised fields and terraces feed cities at 4,000 metres.'] } ],
'西葡殖民美洲': [ { a:1545, b:1700, k:'econ', t:['白银全球循环','The global silver loop'], d:['波托西的银经塞维利亚与马尼拉,最终大半流入中国。','Potosi silver, via Seville and Manila, mostly ending in China.'] } ],
'拉丁美洲诸国': [ { a:1955, b:1990, k:'art', t:['魔幻现实主义','Magical realism'], d:['马尔克斯们把本地经验写成了世界文学。','Garcia Marquez and company make local experience world literature.'] } ],
/* 大洋洲(v189) */
'澳大利亚原住民': [
 { a:-3500, b:1788, k:'tech', t:['养鳗水渠与火棒农业','Eel channels and fire-stick farming'], d:['布吉毕姆的水渠与鱼笼可追到约六千六百年前——远早于这条带在图上的起点,也比金字塔早;有计划的小面积焚烧既引来猎物,又压住大火的燃料。','The channels and traps at Budj Bim go back some 6,600 years — far earlier than where this band starts on the chart, and older than the pyramids; planned small burns drew game and kept fuel from building up.'] },
 { a:-3500, b:2025, k:'thought', t:['歌之途','The songlines'], d:['按顺序唱下来的歌,每一句对应路上一处地形——地图、法典与史书是同一件东西。','A song sung in order, each verse a feature on the route — map, law and history all at once.'] },
 { a:1967, b:2025, k:'thought', t:['清账的半个世纪','Half a century of reckoning'], d:['1967年公投、1992年马博案、2008年道歉;语言正被教回给孩子。','The 1967 referendum, the Mabo judgment of 1992, the apology of 2008 — and the languages being taught back to children.'] } ],
'拉皮塔·南岛航海者': [
 { a:-1300, b:-800, k:'tech', t:['远洋独木舟与导航术','The ocean canoe and the way of finding land'], d:['双体或带舷外浮杆的船能顶风走之字;星星升落当罗盘,涌浪的形状、云底的颜色与归巢海鸟指出岛的方向。','Double hulls and outriggers could work to windward; stars served as a compass, and the shape of swells, the colour under a cloud and homing seabirds pointed to land.'] },
 { a:-1500, b:-800, k:'econ', t:['把农场搬上船','A farm carried aboard'], d:['猪、狗、鸡加上芋头、山药、面包果——装的是「到了就能过日子」的全套,所以是定居而不是探险。','Pigs, dogs and chickens with taro, yam and breadfruit — the kit for living on arrival, which makes it settlement rather than exploration.'] } ],
'汤加帝国': [
 { a:1200, b:1500, k:'econ', t:['靠船运转的朝贡网','A tribute network run on canoes'], d:['斐济出硬木与独木舟、萨摩亚出细编席,汤加是中心节点;这张网靠季风与洋流,不靠道路与仓库。','Fiji sent hardwood and canoes, Samoa fine mats, and Tonga was the hub — a network run on winds and currents rather than roads and warehouses.'] },
 { a:1200, b:1300, k:'tech', t:['巨石门与石砌王陵','The trilithon and the terraced tombs'], d:['哈阿蒙加的立柱重约三四十吨,石材从海边采出运来;穆阿的朗吉用切割拼接的珊瑚石灰岩垒成。','The uprights of the Haʻamonga weigh perhaps thirty to forty tonnes, quarried at the shore and hauled inland; the langi at Muʻa are built of cut and fitted coral limestone.'] } ],
'南马都尔': [
 { a:1180, b:1500, k:'tech', t:['礁盘上垒起的玄武岩城','A basalt city stacked on the reef'], d:['柱状玄武岩横竖交叠、像搭木屋一样垒成高墙,九十多座人工小岛立在潮间礁坪上;没有金属工具、轮子和役畜。','Columnar basalt laid crosswise like a log cabin into high walls, over ninety man-made islets standing on the tidal reef — with no metal tools, wheels or draught animals.'] } ],
'拉帕努伊·复活节岛': [
 { a:1250, b:1600, k:'art', t:['摩艾','The moai'], d:['近千尊石像,最大的一尊立起来约十米、近八十吨,面朝内陆守着自己的村子。','Close to a thousand figures, the largest about ten metres and eighty tonnes standing, all facing inland to watch over their own village.'] } ],
'毛利': [
 { a:1500, b:1769, k:'tech', t:['帕堡','The pā'], d:['筑在山脊上的设防聚落,壕沟、土垒与木栅层层设防,全国记录在案的超过三千座。','Fortified settlements on ridges, defended by successive ditches, banks and palisades — over three thousand have been recorded.'] },
 { a:1975, b:2025, k:'thought', t:['条约清账与语言复兴','Settling the treaty, reviving the language'], d:['怀唐伊仲裁庭审理历史索赔并促成附带道歉的和解;1987年毛利语成为官方语言,「语言巢」把它教回给孩子。','The Waitangi Tribunal hears historical claims and drives settlements that come with apologies; te reo became official in 1987 and language nests teach it back to children.'] } ],
'夏威夷王国': [
 { a:1840, b:1887, k:'thought', t:['宪法与国际承认','A constitution, and recognition'], d:['1840年起有成文宪法、议会与最高法院,1840年代获英法美承认,与二十多国签约——按当时国际法是个正常的主权国家。','A written constitution, legislature and supreme court from 1840, recognition by Britain, France and the United States in that decade, and treaties with over twenty states — an ordinary sovereign state by the law of the day.'] } ],
'汤加王国': [
 { a:1862, b:1875, k:'thought', t:['解放法典与成文宪法','An emancipation code and a written constitution'], d:['1862年解除平民对酋长的人身依附,1875年立宪设议会——太平洋岛屿上很早的一部成文宪法,至今仍在用。','Commoners freed from personal bondage to the chiefs in 1862, a constitution and parliament in 1875 — an early written constitution among the Pacific islands, and still in force.'] } ],
'欧洲殖民大洋洲': [
 { a:1860, b:1900, k:'econ', t:['种植园与劳工贸易','Plantations and the labour trade'], d:['昆士兰与斐济的甘蔗园要人手,1863年起约六万二千人被运往昆士兰、两万七千人以上被运往斐济,有受雇的也有被掳的;这条产业链改变了美拉尼西亚的人口与语言。','The cane fields of Queensland and Fiji needed hands, and from 1863 some sixty-two thousand were carried to Queensland and twenty-seven thousand more to Fiji, some hired and many taken; the trade changed the population and the languages of Melanesia.'] } ],
'澳新与太平洋岛国': [
 { a:1990, b:2025, k:'thought', t:['小国的气候外交','Climate diplomacy from small states'], d:['人口一万多的国家,管辖的海域比印度还大;巴黎协定里那句 1.5℃ 主要是它们推进去的——对图瓦卢来说那不是模型,是国家还在不在。','States of a few thousand people administer ocean larger than India; the 1.5°C line in the Paris Agreement is there largely because they pushed it in — for Tuvalu that is not a model but whether the country still exists.'] } ],
};
