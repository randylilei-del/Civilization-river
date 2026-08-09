/* ---------- 补充大事记(双语内联,渲染时按年并入排序) ---------- */
const CHRONO_X = {
'古希腊': [
 [-1050, ['铁器取代青铜','Iron replaces bronze'], ['宫殿经济崩塌,冶铁反而普及到寻常人家。','The palaces gone, iron spreads to ordinary hands.']],
 [-900, ['多利亚人定居','The Dorians settle'], ['方言分布与日后城邦的版图在这几百年里成形。','Dialects and the future map of the city-states take shape.']],
 [-800, ['荷马史诗写定','The Homeric epics written down'], ['口头传唱四百年的特洛伊故事,借新借来的字母落成文字。','Four centuries of oral Troy, fixed with a newly borrowed alphabet.']],
 [-490, ['马拉松之战','Marathon'], ['雅典重装步兵初挫波斯。','Athens checks Persia.']],
 [-399, ['苏格拉底之死','Death of Socrates'], ['一杯毒芹,哲学的殉道时刻。','The hemlock cup.']],
 [-387, ['柏拉图学园','The Academy'], ['西方高等教育的原点。','The West\'s first academy.']] ],
'罗马共和国': [
 [-44, ['凯撒遇刺','Caesar assassinated'], ['三月十五,共和的落幕开场。','The Ides of March.']] ],
'罗马帝国': [
 [79, ['维苏威火山','Vesuvius erupts'], ['庞贝定格于火山灰下。','Pompeii frozen in ash.']],
 [80, ['斗兽场落成','Colosseum opens'], ['五万人的娱乐机器。','An arena for fifty thousand.']],
 [165, ['安东尼瘟疫','Antonine plague'], ['疫病动摇盛世根基。','Plague shakes the golden age.']],
 [330, ['君士坦丁堡落成','Constantinople dedicated'], ['帝国重心东移。','The center moves east.']] ],
'拜占庭': [
 [537, ['圣索菲亚落成','Hagia Sophia completed'], ['"所罗门,我胜过了你"。','"Solomon, I have outdone thee."']],
 [717, ['希腊火守城','Greek fire saves the city'], ['阿拉伯围攻再度失败。','The Arab siege broken.']],
 [1018, ['征服保加利亚','Bulgaria conquered'], ['巴西尔二世,帝国中兴顶点。','Basil II at the second peak.']] ],
'阿拉伯哈里发': [
 [632, ['先知逝世','Death of the Prophet'], ['继承之争埋下逊尼什叶分野。','The succession question begins.']],
 [680, ['卡尔巴拉','Karbala'], ['侯赛因殉难,什叶认同定型。','Husayn\'s martyrdom shapes Shia identity.']],
 [909, ['法蒂玛王朝','Fatimids rise'], ['什叶派哈里发立于北非。','A Shia caliphate in North Africa.']] ],
'奥斯曼帝国': [
 [1389, ['科索沃之战','Kosovo'], ['巴尔干门户洞开。','The Balkans open.']],
 [1520, ['苏莱曼即位','Suleiman enthroned'], ['立法者与大帝。','The Lawgiver.']],
 [1774, ['库楚克开纳吉和约','Kucuk Kaynarca'], ['对俄败局开启衰退世纪。','Defeat by Russia opens the long decline.']] ],
'古埃及': [
 [-1353, ['阿肯那顿改革','Akhenaten\'s revolution'], ['一神实验昙花一现。','A monotheist experiment.']],
 [-1332, ['图坦卡蒙即位','Tutankhamun enthroned'], ['九岁登基十九岁早逝;三千年后他的黄金面具成了古埃及的脸。','Crowned at nine, dead at nineteen — his gold mask became Egypt\'s face.']],
 [-1279, ['拉美西斯二世即位','Ramesses II'], ['六十七年盛世与巨像。','Sixty-seven years of colossi.']],
 [-196, ['罗塞塔石碑','Rosetta Stone'], ['两千年后开启象形文字之锁。','The key that later unlocked hieroglyphs.']] ],
'大英帝国·英国': [
 [1600, ['东印度公司成立','East India Company'], ['一家公司的帝国序章。','A company\'s imperial prologue.']],
 [1687, ['牛顿《原理》','Newton\'s Principia'], ['经典物理奠基。','Classical physics founded.']],
 [1825, ['第一条铁路','First railway'], ['斯托克顿-达灵顿线通车。','Stockton-Darlington opens.']],
 [1859, ['《物种起源》','On the Origin of Species'], ['达尔文改写生命观。','Darwin rewrites life.']],
 [1940, ['不列颠之战','Battle of Britain'], ['"最光辉的时刻"。','"Their finest hour."']] ],
'法兰西': [
 [1661, ['凡尔赛动工','Versailles begun'], ['绝对王权的舞台。','Absolutism\'s stage.']],
 [1889, ['埃菲尔铁塔','Eiffel Tower'], ['工业时代的巴黎地标。','Industrial Paris\'s landmark.']],
 [1944, ['巴黎解放','Paris liberated']],
 [1968, ['五月风暴','May 1968'], ['战后社会的转折点。','The postwar turning point.']] ],
'美国': [
 [1848, ['加州淘金热','Gold Rush'], ['百万人西进。','A million head west.']],
 [1863, ['解放宣言','Emancipation Proclamation']],
 [1908, ['T型车','Model T'], ['流水线时代开始。','The assembly-line age.']],
 [1941, ['珍珠港','Pearl Harbor'], ['孤立主义终结。','Isolationism ends.']],
 [1963, ['《我有一个梦想》','"I Have a Dream"'], ['民权运动的高点。','The civil-rights high tide.']],
 [2008, ['金融危机','Financial crisis'], ['大衰退波及全球。','The Great Recession.']] ],
'日本': [
 [710, ['奈良建都','Nara founded'], ['仿长安的平城京。','A capital modeled on Chang\'an.']],
 [1008, ['《源氏物语》','Tale of Genji'], ['世界最早长篇小说之一。','Among the world\'s first novels.']],
 [1467, ['应仁之乱','Onin War'], ['战国时代开幕。','The Warring States begin.']],
 [1590, ['丰臣统一','Hideyoshi unifies']],
 [1964, ['东京奥运','Tokyo Olympics'], ['战后复兴的成人礼。','Postwar recovery confirmed.']] ],
'俄罗斯·苏联': [
 [1547, ['伊凡雷帝称沙皇','Ivan the Terrible crowned Tsar']],
 [1825, ['十二月党人起义','Decembrist revolt']],
 [1869, ['《战争与和平》','War and Peace'], ['文学黄金时代的丰碑。','The golden age\'s monument.']],
 [1961, ['加加林上天','Gagarin in orbit'], ['人类首次进入太空。','First human in space.']] ],
'西班牙·葡萄牙': [ [1605, ['《堂吉诃德》','Don Quixote'], ['近代小说的开山。','The first modern novel.']] ],
'西周': [
 [-1042, ['三监之乱','Rebellion of the Three Guards'], ['武王早逝,周公东征三年平定。','Zhou Gong\'s three-year eastern campaign.']],
 [-1036, ['营建成周洛邑','Chengzhou built at Luoyi'], ['东方陪都,控制殷商旧地。','An eastern capital to hold the old Shang lands.']],
 [-977, ['昭王南征不返','King Zhao lost in the south'], ['王师丧于汉水,南方扩张受挫。','The royal army perishes on the Han River.']],
 [-878, ['厉王专利','King Li\'s monopolies'], ['垄断山林川泽之利,民怨积聚。','Seizing the forests and rivers; resentment builds.']],
 [-827, ['宣王中兴','King Xuan\'s restoration'], ['最后一次回光返照。','The last revival before the fall.']] ],
'秦': [
 [-219, ['泰山封禅','Sacrifice at Mount Tai'], ['向天地宣告新秩序。','Announcing the new order to Heaven.']],
 [-215, ['蒙恬北筑长城','Meng Tian builds the Wall'], ['三十万人,连缀旧墙成万里。','Three hundred thousand men link the old walls.']],
 [-214, ['南征百越·凿灵渠','The south taken, Lingqu canal cut'], ['长江与珠江水系首次连通。','Yangtze and Pearl river systems joined.']],
 [-212, ['骊山陵与兵马俑','The tomb and the Terracotta Army'], ['七十万人营建,两千年后重见天日。','Seventy thousand workers; unearthed 2,200 years later.']] ],
'隋': [
 [581, ['杨坚代周建隋','Yang Jian founds Sui'], ['北周外戚受禅,分裂将终。','A regent takes the throne; division nears its end.']],
 [583, ['营建大兴城','Daxing city built'], ['规划严整的新长安,唐代沿用。','The planned new Chang\'an the Tang inherited.']],
 [604, ['炀帝即位','Emperor Yang enthroned'], ['大工程与大远征同时启动。','Grand works and grand campaigns at once.']],
 [609, ['西巡张掖','Western tour to Zhangye'], ['亲赴河西,西域二十七国来朝。','Twenty-seven Western states pay court.']],
 [618, ['江都之变','Murder at Jiangdu'], ['禁军哗变弑君,三十七年而亡。','The guards revolt; thirty-seven years and done.']] ],
'元': [
 [1275, ['马可波罗抵上都','Marco Polo reaches Shangdu'], ['他的游记让欧洲第一次想象东方。','His book gave Europe its first image of the East.']],
 [1280, ['《授时历》颁行','The Shoushi calendar'], ['郭守敬定回归年 365.2425 日,与今历同。','Guo Shoujing\'s year: 365.2425 days — as we use today.']],
 [1294, ['忽必烈逝世','Kublai dies'], ['此后帝位屡争,统治转衰。','Succession fights begin; the decline sets in.']],
 [1313, ['恢复科举','Civil exams restored'], ['停废近八十年后重开,名额分族。','Reopened after eighty years, with ethnic quotas.']],
 [1344, ['黄河大决','The Yellow River breaks'], ['征民夫十五万治河,反成起义导火索。','150,000 conscripts dig — and rebel.']] ],
'孔雀王朝': [
 [-528, ['佛陀成道','The Buddha\'s awakening'], ['菩提树下,一场影响半个亚洲的顿悟。','Under the bodhi tree, an insight that shaped half of Asia.']],
 [-483, ['佛陀涅槃与第一次结集','Parinirvana and the First Council'], ['弟子集结教法,佛典成形。','Disciples gather the teachings into scripture.']],
 [-326, ['亚历山大战象阵','Alexander at the Hydaspes'], ['希腊军首次撞上印度战象,随后东归。','Greeks meet war elephants, then turn back.']],
 [-268, ['阿育王即位','Ashoka enthroned'], ['征服者,后来的护法之王。','The conqueror who became the dharma king.']],
 [-232, ['阿育王逝世','Death of Ashoka'], ['石柱诏令留存至今,帝国随即分崩。','His pillar edicts survive; the empire does not.']] ],
'笈多王朝': [
 [335, ['沙摩陀罗笈多征伐','Samudragupta\'s campaigns'], ['"印度的拿破仑",北印大半归附。','"India\'s Napoleon" — most of the north submits.']],
 [380, ['超日王即位','Chandragupta II'], ['疆域与文治双高峰。','The double peak of arms and letters.']],
 [427, ['那烂陀寺创建','Nalanda founded'], ['此后八百年的世界佛学中心。','The world\'s Buddhist university for eight centuries.']],
 [455, ['击退嚈哒','Skandagupta repels the Hunas'], ['守住一代,国力却已耗尽。','One generation saved, the treasury spent.']] ],
'古巴比伦': [
 [-1754, ['《汉谟拉比法典》','Code of Hammurabi'], ['石柱刻 282 条,以眼还眼。','282 laws on a stone pillar: eye for eye.']],
 [-1595, ['赫梯洗劫巴比伦','Hittites sack Babylon'], ['古巴比伦王国终结。','The Old Babylonian kingdom ends.']] ],
'亚述': [
 [-1225, ['亚述夺巴比伦','Assyria takes Babylon'], ['北方军事强权首次压过南方。','The northern war machine overtakes the south.']],
 [-701, ['围耶路撒冷','Sennacherib besieges Jerusalem'], ['圣经与亚述泥板各记一版。','The Bible and the clay tablets tell it differently.']],
 [-668, ['亚述巴尼拔图书馆','Ashurbanipal\'s library'], ['三万块泥板,《吉尔伽美什》赖此传世。','30,000 tablets — how Gilgamesh survived.']] ],
'新巴比伦': [
 [-605, ['迦基米施之战','Carchemish'], ['尼布甲尼撒败埃及,新巴比伦称雄。','Nebuchadnezzar beats Egypt; Babylon rises again.']] ],
'苏美尔·阿卡德': [
 [-3200, ['轮子与圆筒印章','The wheel and the cylinder seal'], ['运输与签名,两项都从这里起步。','Transport and the signature both begin here.']],
 [-2700, ['吉尔伽美什','Gilgamesh of Uruk'], ['人类最早的英雄史诗主角。','The hero of humanity\'s oldest epic.']],
 [-2450, ['秃鹫石碑','Stele of the Vultures'], ['现存最早的战争纪功碑。','The earliest surviving war monument.']],
 [-2254, ['纳拉姆辛称"四方之王"','Naram-Sin, King of the Four Quarters'], ['第一位自称神的国王。','The first king to call himself a god.']],
 [-2004, ['乌尔陷落','Ur falls'], ['埃兰人破城,苏美尔语退为学术语言。','Elam sacks the city; Sumerian survives only in schools.']] ],
'希腊化王朝': [
 [-312, ['塞琉古纪元开始','The Seleucid era begins'], ['人类第一套连续纪年。','The first continuous year-count in history.']],
 [-305, ['托勒密称王','Ptolemy takes the crown'], ['希腊人统治埃及近三百年。','Greeks rule Egypt for three centuries.']],
 [-240, ['埃拉托色尼量地球','Eratosthenes measures the Earth'], ['靠影子和步测,误差不到 2%。','Shadows and paces — within 2% of the true size.']],
 [-190, ['马格尼西亚之战','Magnesia'], ['罗马击败安条克三世,东方门户洞开。','Rome beats Antiochus III; the East opens.']],
 [-63, ['庞培灭塞琉古','Pompey ends the Seleucids'], ['叙利亚变成罗马行省。','Syria becomes a Roman province.']] ],
'匈奴': [
 [-215, ['蒙恬却匈奴','Meng Tian drives them north'], ['退出河南地七百余里。','Pushed back seven hundred li from the Ordos.']],
 [-176, ['冒顿致汉文帝书','Modu\'s letter to Han'], ['自称已定楼兰乌孙等二十六国。','He claims twenty-six states subdued.']],
 [-119, ['漠北大败','Rout at Mobei'], ['卫青霍去病深入,王庭北迁。','Wei Qing and Huo Qubing force the court north.']],
 [-51, ['呼韩邪称臣','Huhanye submits'], ['南匈奴入汉塞,后有昭君出塞。','The southern Xiongnu enter Han lines.']],
 [89, ['燕然勒石','The Yanran inscription'], ['窦宪破北匈奴,刻石纪功于今蒙古。','Dou Xian\'s victory, carved on a Mongolian cliff.']] ],
'突厥汗国': [
 [568, ['遣使拜占庭','Embassy to Byzantium'], ['绕开波斯,直谈丝路生意。','Bypassing Persia to talk silk directly.']],
 [617, ['始毕可汗助李渊','Shibi Khan backs Li Yuan'], ['唐朝起兵时曾借突厥兵马。','The Tang founder borrowed Turkic horses.']],
 [626, ['便桥之盟','The Wei River treaty'], ['颉利兵临长安,四年后形势逆转。','Twenty li from Chang\'an — and four years later, reversed.']],
 [716, ['毗伽可汗即位','Bilge Khagan'], ['后突厥最后的强盛期。','The second khaganate\'s last strong reign.']],
 [732, ['阙特勤碑','The Kul Tigin stele'], ['突厥文与汉文对照,草原第一份自述史。','Turkic and Chinese side by side — the steppe tells its own story.']] ],
'帖木儿帝国': [
 [1387, ['屠伊斯法罕','Isfahan sacked'], ['以人头筑塔,恐怖即政策。','Towers of skulls as policy.']],
 [1395, ['击溃金帐汗国','The Golden Horde crushed'], ['顺带打断了草原商路北线。','The northern steppe trade route broken with it.']],
 [1420, ['兀鲁伯天文台','Ulugh Beg\'s observatory'], ['撒马尔罕星表精度领先两百年。','A star catalogue unmatched for two centuries.']],
 [1449, ['兀鲁伯遇害','Ulugh Beg murdered'], ['天文学家之王死于亲子之手。','The astronomer-king killed by his son.']],
 [1507, ['昔班尼灭帖木儿朝','The Shaybanids end it'], ['余脉南下印度,建莫卧儿。','A survivor heads south and founds the Mughals.']] ],
'高棉·吴哥': [
 [889, ['耶输陀罗补罗建都','Yasodharapura founded'], ['吴哥城址就此定下。','The site of Angkor is chosen.']],
 [1060, ['巴普昂寺','The Baphuon'], ['须弥山式石构,吴哥窟的预演。','A stone Mount Meru — rehearsal for Angkor Wat.']],
 [1177, ['占婆水军破吴哥','The Cham fleet sacks Angkor'], ['从洞里萨湖直入都城。','Up the Tonle Sap and into the capital.']],
 [1200, ['巴戎寺与吴哥城','The Bayon and Angkor Thom'], ['两百多张巨面石雕微笑俯视。','Two hundred giant stone faces, smiling down.']],
 [1296, ['周达观访吴哥','Zhou Daguan visits'], ['元朝使者留下唯一的当代实录。','A Yuan envoy leaves the only eyewitness account.']] ],
'马里帝国': [
 [1255, ['松迪亚塔逝世','Sundiata dies'], ['其事迹由格里奥世代口传至今。','His deeds are still sung by griots.']],
 [1312, ['曼萨·穆萨即位','Mansa Musa enthroned'], ['可能是人类历史上最富的人。','Perhaps the richest person who ever lived.']],
 [1327, ['廷巴克图大清真寺','Djinguereber Mosque'], ['夯土建筑,至今仍在使用。','Mud-brick, still in use today.']],
 [1352, ['伊本·白图泰来访','Ibn Battuta visits'], ['旅行家称此地治安冠绝天下。','The traveller found it the safest land he knew.']],
 [1433, ['图阿雷格夺廷巴克图','Tuareg take Timbuktu'], ['商业重镇失守,帝国开始收缩。','Losing the trade city, the empire contracts.']] ],
'印加': [
 [1450, ['马丘比丘营建','Machu Picchu built'], ['海拔 2400 米的王室离宫。','A royal retreat at 2,400 metres.']],
 [1493, ['瓦伊纳·卡帕克即位','Huayna Capac'], ['疆域北抵今厄瓜多尔,达到极盛。','The empire reaches its greatest extent.']],
 [1500, ['印加大道贯通','The royal roads joined'], ['约三万公里,靠接力信使传令。','Some 30,000 km, run by relay messengers.']] ],
'德意志': [
 [1866, ['普奥战争','Koniggratz'], ['七周击败奥地利,统一路线定为"小德意志"。','Austria beaten in seven weeks.']],
 [1923, ['恶性通胀','Hyperinflation'], ['一条面包要几十亿马克。','A loaf of bread costs billions of marks.']],
 [1939, ['入侵波兰','Poland invaded'], ['二战在欧洲爆发。','The Second World War begins in Europe.']],
 [1961, ['柏林墙','The Berlin Wall'], ['一夜之间砌起,二十八年后推倒。','Up in a night, down twenty-eight years later.']],
 [2002, ['欧元流通','The euro'], ['马克退场,欧洲经济一体化落地。','The mark retires; Europe integrates.']] ],
'印度·南亚诸国': [
 [1948, ['甘地遇刺','Gandhi assassinated'], ['独立不到半年,非暴力的象征倒下。','Six months after freedom, the apostle of non-violence falls.']],
 [1950, ['宪法生效','The Constitution takes effect'], ['世界最长的成文宪法,确立共和。','The world\'s longest written constitution.']],
 [1962, ['中印边境战争','Sino-Indian border war'], ['短暂冲突,影响两国关系数十年。','A short war that shaped decades.']],
 [1966, ['绿色革命','The Green Revolution'], ['高产麦种终结周期性饥荒。','High-yield wheat ends the famine cycle.']],
 [1975, ['紧急状态','The Emergency'], ['宪政中断两年,民主经受考验。','Two years of suspended rights.']] ],
'欧洲殖民东南亚': [
 [1521, ['麦哲伦死于麦克坦','Magellan dies at Mactan'], ['环球船队的首领倒在菲律宾。','The circumnavigator falls in the Philippines.']],
 [1571, ['西班牙建马尼拉','Manila founded'], ['大帆船贸易的亚洲端点。','The Asian end of the galleon trade.']],
 [1641, ['荷兰夺马六甲','The Dutch take Malacca'], ['香料贸易易主。','The spice trade changes hands.']],
 [1819, ['莱佛士建新加坡','Raffles founds Singapore'], ['一个自由港改写海峡格局。','A free port rewrites the Straits.']],
 [1887, ['法属印度支那','French Indochina'], ['越南、柬埔寨并入殖民联邦。','Vietnam and Cambodia bound into one colony.']],
 [1954, ['奠边府','Dien Bien Phu'], ['法军战败,殖民时代实质终结。','France loses; the colonial age is over.']] ],
'欧洲殖民非洲': [
 [1807, ['英国废除奴隶贸易','Britain bans the slave trade'], ['四百年跨大西洋贩运开始收尾。','Four centuries of the Atlantic trade begin to close.']],
 [1830, ['法国入侵阿尔及利亚','France invades Algeria'], ['近代欧洲瓜分非洲的第一枪。','The first shot of the modern scramble.']],
 [1869, ['苏伊士运河通航','Suez Canal opens'], ['非洲变成通往亚洲的必经之地。','Africa becomes the road to Asia.']],
 [1899, ['布尔战争','The Boer War'], ['黄金与钻石引来的白人内战。','Gold and diamonds bring a settlers\' war.']],
 [1935, ['意大利侵埃塞俄比亚','Italy invades Ethiopia'], ['最后一个独立古国也告沦陷。','The last independent ancient state falls.']],
 [1975, ['葡属殖民地独立','Portugal\'s colonies free'], ['最早来的最晚走。','First to arrive, last to leave.']] ],
'西葡殖民美洲': [
 [1521, ['特诺奇提特兰陷落','Tenochtitlan falls'], ['六百西班牙人加数万盟军与天花。','Six hundred Spaniards, native allies, and smallpox.']],
 [1542, ['《新法律》颁布','The New Laws'], ['拉斯卡萨斯推动,限制奴役印第安人。','Las Casas pushes limits on native servitude.']],
 [1767, ['驱逐耶稣会','Jesuits expelled'], ['传教区体系瓦解,王权收紧。','The mission system collapses.']],
 [1808, ['拿破仑入西班牙','Napoleon takes Spain'], ['宗主国失能,美洲趁势自治。','With Madrid paralysed, the colonies self-govern.']],
 [1824, ['阿亚库乔之战','Ayacucho'], ['西属美洲大陆统治终结。','Spanish rule on the mainland ends.']] ],
'奥尔梅克': [
 [-1150, ['圣洛伦索鼎盛','San Lorenzo at its height'], ['美洲第一个区域中心,巨石头像多数刻于此时。','The Americas\' first regional centre; most colossal heads date here.']],
 [-850, ['卡斯卡哈尔石板','The Cascajal block'], ['62 个符号,美洲最早文字的候选。','Sixty-two glyphs — a candidate for the Americas\' first writing.']],
 [-500, ['橡胶球赛','The rubber ballgame'], ['用橡胶做球是他们的发明,这项运动此后玩了两千年。','They invented the rubber ball; the game lasted two thousand years.']] ],
'瓦里·蒂瓦纳科': [
 [700, ['蒂瓦纳科太阳门','The Gateway of the Sun'], ['整块安山岩凿出的门,门楣刻着持杖神。','A doorway cut from one block, the Staff God carved above.']],
 [900, ['瓦里的道路与梯田','Wari roads and terraces'], ['印加人后来接手的正是这套基建。','The infrastructure the Inca would later inherit.']] ],
'特奥蒂瓦坎': [
 [250, ['羽蛇神庙','Temple of the Feathered Serpent'], ['两百多个蛇首石雕,地基下埋着上百名武士殉葬。','Two hundred serpent heads; a hundred warriors buried beneath.']],
 [378, ['远征蒂卡尔','The Tikal intervention'], ['特奥蒂瓦坎将军"火之生"废立玛雅国王——两大文明正面相遇。','General "Fire-Born" deposes Tikal\'s king: two civilizations meet.']] ],
'玛雅': [
 [426, ['科潘王朝开基','The Copan dynasty founded'], ['此后四百年的雕刻之城。','Four centuries of the sculptors\' city begin.']],
 [562, ['蒂卡尔与卡拉克穆尔之战','Tikal vs. Calakmul'], ['玛雅世界的"两超争霸",打了一百多年。','The Maya world\'s superpower rivalry, a century long.']],
 [1000, ['奇琴伊察鼎盛','Chichen Itza at its height'], ['羽蛇神金字塔:春分日蛇影沿阶梯爬下。','At equinox a serpent of shadow descends the pyramid.']] ],
'阿兹特克': [
 [1473, ['吞并特拉特洛尔科','Tlatelolco absorbed'], ['拿下姊妹城,也拿下了美洲最大的市场。','The sister city falls — and with it the greatest market.']],
 [1502, ['蒙特祖马二世即位','Moctezuma II enthroned'], ['帝国最大时登基,十七年后亲见它崩塌。','Crowned at the empire\'s peak; he lived to watch it fall.']] ],
'塞尔柱突厥': [
 [1037, ['图格里勒建国','Tughril founds the state'], ['从咸海边的部落到近东霸主,只用了二十年。','From Aral-sea tribe to Near-East hegemon in twenty years.']],
 [1077, ['鲁姆苏丹国分立','The Sultanate of Rum'], ['安纳托利亚从此突厥化——今天的土耳其由此起头。','Anatolia turns Turkic: today\'s Turkiye starts here.']],
 [1097, ['第一次十字军来袭','The First Crusade arrives'], ['尼西亚陷落;此后两百年拉锯的开场。','Nicaea falls; two centuries of tug-of-war begin.']] ],
'伊尔汗国': [
 [1260, ['阿音扎鲁特之败','Ain Jalut'], ['蒙古西进第一次被正面挡住,埃及因此得存。','The Mongol advance is stopped cold; Egypt survives.']],
 [1307, ['《史集》编成','The Jami al-Tawarikh'], ['拉施特丁写出第一部真正的"世界史"。','Rashid al-Din writes the first true world history.']] ],
'萨法维·波斯': [
 [1514, ['查尔迪兰之战','Chaldiran'], ['奥斯曼的火炮打赢了骑兵——波斯从此学火器。','Ottoman cannon beat cavalry; Persia takes up firearms.']],
 [1639, ['祖哈布和约','The Treaty of Zuhab'], ['与奥斯曼划定的边界,大体就是今天伊朗-伊拉克边界。','The border drawn here is roughly today\'s Iran-Iraq line.']],
 [1786, ['恺加定都德黑兰','The Qajars fix the capital at Tehran'], ['一座路边的村镇成了首都,至今没有再搬。','A town on the road became the capital, and has stayed one.']],
 [1906, ['波斯立宪革命','The Constitutional Revolution'], ['亚洲最早的立宪运动之一。','One of Asia\'s first constitutional movements.']] ],
'罗马治下近东': [
 [132, ['巴尔·科赫巴起义','The Bar Kokhba revolt'], ['镇压之后,犹太人大流散成为定局。','After its crushing, the Jewish diaspora becomes permanent.']],
 [267, ['芝诺比亚崛起','Zenobia rises'], ['帕尔米拉女王一度统治埃及到小亚。','The queen of Palmyra briefly rules from Egypt to Anatolia.']] ],
'现代中东': [
 [1960, ['OPEC 成立','OPEC founded'], ['产油国第一次联手定价。','Oil states set prices together for the first time.']],
 [1993, ['奥斯陆协议','The Oslo Accords'], ['握手很近,和平很远。','The handshake was close; peace was not.']] ],
'二里头·夏': [
 [-1750, ['一号宫殿营建','Palace One rises'], ['中轴对称的宫室格局,此后三千年中国宫殿的雏形。','The axial palace plan Chinese courts would follow for 3,000 years.']] ],
'三国': [
 [222, ['夷陵之战','Yiling'], ['刘备伐吴,火烧连营七百里。','Liu Bei\'s camps burn for seven hundred li.']],
 [229, ['孙权称帝','Sun Quan takes the throne'], ['三帝并立,鼎足之势名实俱全。','Three emperors at once — the tripod complete.']],
 [249, ['高平陵之变','The Gaoping Tombs coup'], ['司马懿装病夺权,三国的结局在此写定。','Sima Yi feigns illness and seizes power; the ending is set.']] ],
'西晋': [
 [266, ['司马炎代魏','Sima Yan takes the Wei throne'], ['三代经营,一朝禅代。','Three generations of scheming, one abdication.']],
 [303, ['《三都赋》洛阳纸贵','Zuo Si empties the paper shops'], ['一篇赋让洛阳纸价上涨——"洛阳纸贵"由此而来。','One rhapsody drives up the price of paper in Luoyang.']] ],
'五代十国': [
 [923, ['后唐灭后梁','Later Tang destroys Later Liang'], ['五代第一次改朝,此后平均十几年换一姓。','The first turnover; a new house every dozen years after.']],
 [975, ['金陵陷落,李煜降宋','Jinling falls; Li Yu surrenders'], ['亡国之君写出"问君能有几多愁"。','The captive king writes his greatest lines.']] ],
'辽': [
 [938, ['得燕云十六州','The Sixteen Prefectures acquired'], ['不费一兵从石敬瑭手里接过长城以南。','South of the Wall, handed over without a fight.']],
 [983, ['萧太后摄政','Empress Dowager Xiao regent'], ['承天太后当国二十七年,辽的全盛期。','Twenty-seven years of her rule — the Liao zenith.']],
 [1114, ['女真起兵','The Jurchens rise'], ['两千五百人反辽,十一年后辽亡。','2,500 men rebel; eleven years later Liao is gone.']] ],
'西夏': [
 [1081, ['五路伐夏','The five-column invasion'], ['宋倾国来攻,无功而返。','Song throws everything at Xia, and returns empty.']],
 [1190, ['《番汉合时掌中珠》','The Pearl in the Palm'], ['西夏文-汉文双语字典,后来靠它破译西夏文。','The bilingual glossary that later unlocked the script.']] ],
'金': [
 [1161, ['海陵王南侵败于采石','Wanyan Liang fails at Caishi'], ['一心吞宋的皇帝败后被部下所杀。','The emperor who would swallow Song is killed by his own men.']],
 [1189, ['金世宗治世结束','The "Little Yao and Shun" era ends'], ['二十九年小康,女真政权的顶点。','Twenty-nine good years — the Jurchen state\'s peak.']] ],
'东晋·十六国': [
 [366, ['敦煌莫高窟开凿','The Mogao Caves begun'], ['乐僔和尚凿下第一窟,此后营造一千年。','A monk cuts the first cave; a thousand years of building follow.']],
 [420, ['刘裕代晋','Liu Yu takes the throne'], ['寒门武人终结门阀的王朝。','A soldier of humble birth ends the aristocrats\' dynasty.']] ],
'米诺斯·迈锡尼': [
 [-2000, ['最早的宫殿与线形文字A','First palaces and Linear A'], ['欧洲最早的文字,至今没人读得懂。','Europe\'s first script — still undeciphered.']],
 [-1600, ['圣托里尼火山大爆发','The Thera eruption'], ['整座岛炸掉一半,亚特兰蒂斯传说的源头之一。','Half the island gone — one root of the Atlantis legend.']],
 [-1250, ['特洛伊战争的时代','The age of the Trojan War'], ['荷马唱的正是这批迈锡尼王的远征。','The kings Homer sang were these Mycenaeans.']] ],
'腓尼基': [
 [-950, ['希兰王助建圣殿','Hiram helps build the Temple'], ['推罗的雪松与工匠,建起所罗门圣殿。','Tyre\'s cedar and craftsmen raise Solomon\'s Temple.']],
 [-600, ['奉命环航非洲','Around Africa for the Pharaoh'], ['希罗多德记载:三年绕非洲一圈,比达伽马早两千年。','Herodotus says they rounded Africa — 2,000 years before da Gama.']] ],
'赫梯': [
 [-1259, ['世界最早的成文和约','The first written peace treaty'], ['与埃及的银板和约,复制品挂在联合国总部。','The silver treaty with Egypt; a copy hangs at the UN.']] ],
'迦太基': [
 [-500, ['汉诺远航西非','Hanno sails down West Africa'], ['六十船探到几内亚湾,带回"多毛野人"的记载——可能是大猩猩。','Sixty ships reach the Gulf of Guinea and report "hairy savages" — likely gorillas.']] ],
'吠陀时代': [
 [-600, ['十六雄国并立','The sixteen Mahajanapadas'], ['列国争雄的印度"战国",佛陀就诞生在这个乱局里。','India\'s warring states — the world the Buddha was born into.']] ],
'贵霜帝国': [
 [60, ['丘就却统一诸部','Kujula unites the yabghus'], ['五翕侯归一,月氏人变成帝国。','Five chiefdoms become one; the Yuezhi become an empire.']],
 [128, ['第四次佛典结集','The Fourth Buddhist Council'], ['迦腻色伽在克什米尔召集,大乘从此有了官方靠山。','Kanishka convenes it in Kashmir; Mahayana gains a throne behind it.']] ],
'朱罗王朝': [
 [850, ['维阇耶阿罗耶复国','Vijayalaya refounds the line'], ['从坦贾武尔一城起步,两百年后称霸印度洋。','From one town to mastery of the Indian Ocean in two centuries.']] ],
'德里苏丹国': [
 [1236, ['拉齐娅苏丹即位','Razia Sultan enthroned'], ['印度历史上唯一的女苏丹,在位四年。','India\'s only woman sultan — four years on the throne.']] ],
'斯基泰': [
 [-700, ['进入黑海北岸','Into the Pontic steppe'], ['驱走辛梅里安人,占住南俄草原。','The Cimmerians pushed out of the south-Russian grass.']],
 [-672, ['南下劫掠近东','Raids into the Near East'], ['连亚述与米底都要跟他们打交道。','Even Assyria and Media had to deal with them.']],
 [-440, ['希罗多德记其风俗','Herodotus writes them down'], ['无城无田,车帐为家——最早的草原民族志。','No walls, no fields: the first ethnography of the steppe.']],
 [-339, ['阿泰阿斯战死','Ateas falls'], ['九十余岁的老王败于马其顿腓力二世。','A king past ninety, beaten by Philip II.']] ],
'匈人': [
 [376, ['逼哥特人渡多瑙河','Goths driven across the Danube'], ['一次连锁推挤,罗马边境从此不稳。','One shove, and Rome\'s frontier never held again.']],
 [441, ['横扫巴尔干','The Balkans overrun'], ['拜占庭连年纳贡求和。','Constantinople pays year after year.']],
 [452, ['兵临罗马城下而退','Attila turns back from Rome'], ['教宗利奥一世出面,原因至今争论。','Pope Leo met him; historians still argue why he left.']],
 [454, ['尼达奥之战','Nedao'], ['被征服诸族反戈,帝国一战散尽。','The subject peoples turn; the empire evaporates.']] ],
'回鹘': [
 [760, ['建鄂尔浑牙帐城','Ordu-Baliq built'], ['草原上第一座常住城市。','The steppe\'s first permanent city.']],
 [762, ['奉摩尼教为国教','Manichaeism made the state faith'], ['史上唯一以摩尼教立国的政权。','The only state ever to adopt it.']],
 [821, ['太和公主和亲','A Tang princess sent north'], ['绢马贸易之外,再加一层姻亲。','Silk, horses — and now marriage.']] ],
'蒙古帝国': [
 [1227, ['成吉思汗逝世','Genghis dies'], ['死于征西夏途中,葬地至今不明。','On campaign against Xixia; the grave was never found.']],
 [1235, ['建哈拉和林','Karakorum built'], ['草原帝国有了都城,各国使节云集。','A capital at last, and envoys from everywhere.']],
 [1246, ['教宗使节到和林','The Pope\'s envoy arrives'], ['柏朗嘉宾带回欧洲第一份蒙古实录。','Plano Carpini brings Europe its first real report.']],
 [1259, ['蒙哥死于钓鱼城','Mongke dies at Diaoyu'], ['西征骤停,旭烈兀东返,埃及因此得存。','The western advance halts — and Egypt survives.']] ],
'准噶尔': [
 [1678, ['噶尔丹称汗','Galdan becomes khan'], ['最后一个草原帝国的缔造者。','Founder of the last steppe empire.']],
 [1688, ['击破喀尔喀','The Khalkha routed'], ['喀尔喀南奔,从此归附清朝。','The Khalkha flee south and join the Qing.']],
 [1696, ['昭莫多之战','Jao Modo'], ['康熙亲征,噶尔丹主力尽没。','Kangxi in the field; Galdan\'s army is destroyed.']],
 [1717, ['奇袭拉萨','Lhasa seized'], ['翻越昆仑突入西藏,引来清军入藏。','Over the Kunlun into Tibet — and the Qing follow.']],
 [1745, ['噶尔丹策零死后内乱','Civil war after Galdan Tseren'], ['内斗给了乾隆可乘之机。','The infighting hands Qianlong his opening.']] ],
'俄国治下中亚': [
 [1731, ['小玉兹归附','The Little Horde submits'], ['哈萨克草原并入俄国的第一步。','Step one into the Kazakh steppe.']],
 [1868, ['布哈拉成保护国','Bukhara made a protectorate'], ['千年古城失去自主。','A thousand-year-old city loses its say.']],
 [1916, ['中亚大起义','The 1916 revolt'], ['征夫令引爆,镇压后大批逃亡中国。','A conscription order explodes; many flee to China.']],
 [1930, ['集体化与大饥荒','Collectivization and famine'], ['哈萨克游牧生活被强行终结。','Kazakh nomadic life ends by force.']],
 [1960, ['咸海开始萎缩','The Aral Sea starts to shrink'], ['为种棉花抽干两条大河,渔船搁在沙里。','Two rivers drained for cotton; boats left in sand.']] ],
'现代中亚': [
 [1997, ['迁都阿斯塔纳','Capital moves to Astana'], ['从南部旧城搬到北方草原。','From the old southern city to the northern steppe.']],
 [2001, ['上海合作组织成立','The SCO founded'], ['中俄与中亚四国的区域机制。','A regional bloc with China and Russia.']],
 [2019, ['纳扎尔巴耶夫交权','Nazarbayev steps down'], ['独立一代领导人开始退场。','The independence generation begins to exit.']] ],
'扶南': [
 [68, ['柳叶与混填','Liuye and Huntian'], ['本地女王与外来者联姻的立国传说。','A founding legend: local queen weds a newcomer.']],
 [150, ['奥厄澳港','The port of Oc Eo'], ['出土罗马金币与印度饰物,东西方在此换手。','Roman coins and Indian ornaments in the same soil.']],
 [484, ['遣使南齐','Embassy to the Southern Qi'], ['南海诸国里最早与中原通使的一个。','The first of the southern seas to send envoys north.']],
 [550, ['真腊北来','Chenla rises'], ['内陆属国反客为主。','The inland vassal turns master.']] ],
'三佛齐': [
 [683, ['吉打武吉碑','The Kedukan Bukit inscription'], ['现存最早的马来文碑刻。','The oldest known Malay inscription.']],
 [1079, ['迁都占碑','The capital shifts to Jambi'], ['朱罗打击后,重心北移。','After the Chola blow, the centre moves.']],
 [1225, ['《诸蕃志》记其属国十五','Zhao Rukuo counts fifteen vassals'], ['南宋市舶司的一手商情。','First-hand intelligence from a Song harbour office.']] ],
'大越': [
 [1075, ['首开科举','The first civil examination'], ['照搬中原制度,却是为了独立。','A Chinese institution, adopted to stay un-Chinese.']],
 [1076, ['如月江拒宋','The Song halted at Nhu Nguyet'], ['"南国山河南帝居"——最早的独立宣言之一。','"The Southern realm has its own emperor."']],
 [1428, ['黎利逐明','Le Loi drives out the Ming'], ['二十年抗争,复国成功。','Twenty years of resistance, and independence back.']],
 [1802, ['阮朝统一南北','The Nguyen unify north and south'], ['"越南"国号自此确定。','The name "Viet Nam" is fixed.']] ],
'满者伯夷': [
 [1365, ['《爪哇史颂》','The Nagarakretagama'], ['宫廷长诗列出属地近百,是它最好的自画像。','A court poem naming a hundred dependencies.']],
 [1377, ['攻灭巨港','Palembang taken'], ['三佛齐残余势力被清除。','What was left of Srivijaya is swept away.']],
 [1389, ['哈奄·武禄逝世','Hayam Wuruk dies'], ['盛世君主一走,继承之争接踵。','The great king gone, the succession fights begin.']],
 [1478, ['王室内战','Civil war in the royal house'], ['沿海诸港纷纷伊斯兰化自立。','Coastal ports turn Muslim and go their own way.']] ],
'马六甲及诸苏丹国': [
 [1400, ['拜里米苏拉建港','Parameswara founds the port'], ['一个逃亡王子选中的海峡窄口。','A fugitive prince picks the narrowest point.']],
 [1459, ['满速沙盛期','Mansur Shah\'s height'], ['马来世界的文化与法律范本。','The template for Malay culture and law.']],
 [1521, ['亚齐苏丹国兴起','Aceh rises'], ['马六甲失守后的伊斯兰新枢纽。','A new Muslim hub after Malacca falls.']],
 [1641, ['柔佛助荷取马六甲','Johor helps the Dutch take Malacca'], ['马来王朝借外力报旧仇。','An old grudge settled with foreign guns.']] ],
'暹罗': [
 [1431, ['攻陷吴哥','Angkor taken'], ['高棉都城废弃,泰人接手其宫廷礼制。','The Khmer capital abandoned; its court rites move west.']],
 [1511, ['葡使抵阿瑜陀耶','The first Portuguese embassy'], ['最早与欧洲通使的东南亚王国之一。','Among the first in the region to treat with Europe.']],
 [1688, ['驱逐法国势力','The French expelled'], ['一场宫廷政变挡住了殖民的早班车。','A palace coup turns away the first colonial wave.']],
 [1868, ['朱拉隆功即位','Chulalongkorn'], ['废奴、修铁路、办新学,自上而下改制。','Slavery abolished, railways laid, schools built.']],
 [1932, ['立宪革命','The 1932 revolution'], ['绝对君主制终结,改行君主立宪。','Absolute monarchy ends.']] ],
'现代东南亚': [
 [1946, ['菲律宾独立','Philippines independent'], ['战后亚洲第一个独立的殖民地。','Postwar Asia\'s first colony to go free.']],
 [1978, ['越南入柬','Vietnam enters Cambodia'], ['红色高棉政权被推翻。','The Khmer Rouge regime is toppled.']],
 [1986, ['越南革新开放','Doi Moi'], ['从战时体制转向市场经济。','From a war economy to a market one.']],
 [1998, ['苏哈托下台','Suharto falls'], ['三十二年强人统治结束,印尼转向民主。','Thirty-two years of strongman rule end.']],
 [2002, ['东帝汶独立','Timor-Leste independent'], ['二十一世纪的第一个新国家。','The century\'s first new nation.']] ],
'库施·努比亚': [
 [-1070, ['埃及撤出努比亚','Egypt pulls out of Nubia'], ['新王国衰弱,南方获得空间。','Egypt weakens; the south gets room.']],
 [-760, ['卡什塔北进','Kashta moves north'], ['努比亚开始反向影响埃及。','Nubia starts to push back into Egypt.']],
 [-701, ['塔哈尔卡援犹大','Taharqa marches to Judah\'s aid'], ['黑法老与亚述在近东正面相遇。','A Kushite pharaoh meets Assyria head-on.']],
 [-270, ['麦罗埃文字','The Meroitic script'], ['自创字母,至今读得出音、解不出意。','An alphabet we can pronounce but not translate.']] ],
'阿克苏姆': [
 [270, ['自铸金币','Its own gold coinage'], ['当时全世界只有三四个政权做得到。','Only a handful of powers anywhere could.']],
 [350, ['灭麦罗埃','Meroe destroyed'], ['取代库施成为红海南端霸主。','Kush replaced as master of the southern Red Sea.']],
 [615, ['收留最早的穆斯林','Refuge for the first Muslims'], ['先知的追随者渡海避难,受基督教国王庇护。','A Christian king shelters the Prophet\'s followers.']],
 [940, ['古迪特之乱','The revolt of Gudit'], ['传说中的女王终结了王国。','A queen of legend ends the kingdom.']] ],
'加纳帝国': [
 [750, ['骆驼商队成路','The camel caravans settle into routes'], ['撒哈拉从屏障变成走廊。','The Sahara turns from wall into corridor.']],
 [830, ['阿拉伯著作首记其名','First named in Arabic writing'], ['"黄金之国"的名声传到地中海。','Word of a land of gold reaches the Mediterranean.']],
 [1068, ['巴克里的记述','Al-Bakri\'s account'], ['写下国王的黄金坐骑与万人军队。','He describes gold-harnessed horses and an army of thousands.']] ],
'斯瓦希里城邦': [
 [950, ['基尔瓦建城','Kilwa founded'], ['波斯设拉子人与本地人通婚立港。','Shirazi settlers and locals build a port together.']],
 [1100, ['珊瑚石建筑','Coral-stone building'], ['取海中珊瑚为砖,盖清真寺与商馆。','Coral quarried from the sea becomes mosques.']],
 [1200, ['垄断索法拉黄金','Sofala\'s gold cornered'], ['内陆黄金必经基尔瓦出海。','Inland gold can leave only through Kilwa.']],
 [1498, ['达伽马抵马林迪','Da Gama at Malindi'], ['在此雇到领航员,直航印度。','Here he hires the pilot who takes him to India.']] ],
'大津巴布韦': [
 [1100, ['开始干砌石墙','The first dry-stone walls'], ['不用灰浆,靠石块自身咬合。','No mortar — the stones simply lock.']],
 [1250, ['大围墙营建','The Great Enclosure'], ['非洲撒哈拉以南最大的古代石构。','The largest ancient stone structure south of the Sahara.']],
 [1330, ['皂石鸟雕','The soapstone birds'], ['八只石鸟,今日津巴布韦国旗上的图案。','Eight stone birds — now on the national flag.']] ],
'桑海帝国': [
 [1464, ['松尼·阿里即位','Sonni Ali takes power'], ['以骑兵与战船沿尼日尔河扩张。','Cavalry and river boats along the Niger.']],
 [1473, ['攻取杰内','Djenne taken'], ['三大商城尽入版图。','All three great trade cities in one hand.']],
 [1497, ['阿斯基亚朝觐麦加','Askia\'s pilgrimage'], ['带走大笔黄金,带回学者与合法性。','Gold out, scholars and legitimacy back.']],
 [1528, ['阿斯基亚被废','Askia deposed'], ['为亲子所废,时年已近九十且失明。','Deposed by his son, near ninety and blind.']] ],
'现代非洲': [
 [1984, ['埃塞俄比亚大饥荒','The Ethiopian famine'], ['电视画面第一次让全球直面非洲饥荒。','Television brings the famine into the world\'s living rooms.']],
 [1990, ['纳米比亚独立','Namibia independent'], ['非洲大陆最后一块殖民地。','The continent\'s last colony.']],
 [2007, ['M-Pesa 手机支付','M-Pesa launches'], ['肯尼亚跳过银行卡,直接进入移动支付。','Kenya skips the bank card entirely.']],
 [2011, ['南苏丹独立','South Sudan independent'], ['非洲最年轻的国家。','Africa\'s youngest state.']] ],
'印度河文明': [
 [-2500, ['印章与标准砝码','Seals and standard weights'], ['整个流域用同一套度量衡——最早的"质检体系"之一。','One system of weights across the whole valley.']],
 [-2000, ['多拉维拉的蓄水系统','The reservoirs of Dholavira'], ['整座城靠十六座石砌水库过旱季。','Sixteen stone reservoirs carried a city through the dry months.']],
 [-1700, ['晚期哈拉帕','The Late Harappan'], ['大城陆续废弃,人口散入乡村小聚落。','The great cities empty; people scatter into villages.']],
 [-1300, ['最后的聚落','The last settlements'], ['文字随之失传,四千年后仍无人能读。','The script goes with them — still undeciphered four thousand years on.']] ],
'中世纪诸王朝': [
 [550, ['笈多之后的碎裂','After the Guptas'], ['北印再无共主,数十王国互相攻伐五百年。','No overlord again in the north; five centuries of contending kingdoms.']],
 [760, ['埃洛拉凯拉萨神庙','The Kailasa temple at Ellora'], ['整座庙自山顶向下凿出,不是盖的,是掏的。','Carved downward out of one cliff — not built, excavated.']] ],
'唐': [
 [624, ['均田制与租庸调','Land allotment and the three-part tax'], ['按人口授田、按人头收税——盛唐的财政地基,一百五十多年后被两税法取代。','Land by head, tax by head: the fiscal floor of the high Tang, replaced 156 years later.']],
 [653, ['《唐律疏议》','The Tang Code annotated'], ['东亚法典的母本,日本、朝鲜、越南都照它立法。','The template Japan, Korea and Vietnam all copied.']],
 [657, ['灭西突厥','The Western Turks destroyed'], ['继630年灭东突厥之后,突厥问题彻底解决;安西四镇西抵碎叶,唐疆域极盛,此后再没到过这条边界。','After the Eastern Turks in 630, the Turkic problem is finished; the empire reaches its widest, west to Suyab.']],
 [668, ['灭高句丽','Goguryeo falls'], ['隋唐两朝四代人打了七十年才办成。','Seventy years and four reigns to finish.']],
 [705, ['神龙政变','The Shenlong coup'], ['八十二岁的武则天被逼退位,唐室复辟,她当年即崩。','Wu Zetian, aged 82, is forced out; the Tang is restored and she dies that year.']],
 [733, ['始设十节度使','The ten military governors'], ['边将同时握有兵权与财权,二十二年后反噬。','Frontier generals get both troops and taxes; it backfires in twenty-two years.']],
 [753, ['鉴真东渡抵日','Jianzhen reaches Japan'], ['六次出海五次失败,双目失明仍然去了。','Five failed voyages and blindness did not stop him.']],
 [763, ['吐蕃攻陷长安','Tibetans take Chang\'an'], ['安史之乱刚平,首都又丢了一次。','The rebellion barely crushed, and the capital falls again.']],
 [780, ['两税法','The twice-a-year tax'], ['从按人头收税改成按田产收税,此后一千年沿用。','From taxing people to taxing property — the rule for a thousand years.']],
 [819, ['韩愈谏迎佛骨','Han Yu opposes the Buddha relic'], ['一封奏表几乎丢命,却开了古文运动。','A memorial that nearly cost his life, and launched a literary movement.']],
 [845, ['会昌灭佛','The Huichang persecution'], ['四千六百余寺被毁,佛教从此不复鼎盛。','4,600 monasteries destroyed; Buddhism never fully recovers.']] ],
'北宋': [
 [976, ['烛影斧声','The shadows and the axe'], ['太祖暴亡、其弟继位,千年悬案。','The founder dies suddenly; his brother takes the throne.']],
 [979, ['灭北汉','Northern Han conquered'], ['始于907年的分裂到此才真正结束。','The break-up that began in 907 finally ends.']],
 [1041, ['毕昇活字印刷','Bi Sheng\'s movable type'], ['胶泥刻字,比古腾堡早四百年。','Clay type, four centuries before Gutenberg.']],
 [1057, ['嘉祐科举','The examination of 1057'], ['苏轼、苏辙、曾巩同榜,欧阳修主考。','Su Shi, Su Zhe and Zeng Gong in a single cohort.']],
 [1086, ['元祐更化','The Yuanyou reversal'], ['司马光尽废新法,党争自此不休。','Sima Guang undoes the reforms; factional war never ends.']],
 [1088, ['《梦溪笔谈》与水运仪象台','Dream Pool Essays; the astronomical clock'], ['沈括记下活字与磁偏角,苏颂造出带擒纵器的天文钟。','Shen Kuo records magnetic declination; Su Song builds an escapement clock.']] ],
'南宋': [
 [1132, ['管形火器','The first barrel gun'], ['陈规守德安,用长竹竿喷火——火枪的祖先。','Chen Gui defends De\'an with bamboo fire-lances.']],
 [1140, ['郾城大捷','Yancheng'], ['岳飞破金军铁浮图,前锋进至朱仙镇;随即被十二道金牌召还。','Yue Fei breaks the Jin heavy cavalry — then twelve gold tablets order him home.']],
 [1161, ['采石之战','Caishi'], ['虞允文以一万八千人挡住金军南下。','Eighteen thousand men halt the Jin invasion.']],
 [1247, ['《洗冤集录》','The Washing Away of Wrongs'], ['宋慈写下世界最早的法医学专著。','Song Ci writes the world\'s first forensic manual.']],
 [1259, ['钓鱼城之战','Diaoyu Fortress'], ['蒙哥死于城下,蒙古的西征与南下同时停摆。','Mongke dies here; both Mongol advances halt at once.']],
 [1275, ['文天祥勤王','Wen Tianxiang answers the call'], ['散尽家财募兵,明知不可为而为。','He spent his fortune raising troops he knew could not win.']] ],
'明': [
 [1380, ['废丞相','The chancellorship abolished'], ['一千六百年的宰相制度终结,皇权再无制衡。','Sixteen centuries of the office end; nothing checks the throne.']],
 [1408, ['《永乐大典》成书','The Yongle Encyclopedia'], ['两万两千余卷,当时世界最大的百科全书。','22,000 scrolls — the largest compendium on Earth at the time.']],
 [1553, ['葡人入居澳门','The Portuguese settle Macau'], ['东西方第一次长期贴身接触。','East and West in permanent close contact for the first time.']],
 [1567, ['隆庆开关','The sea ban lifted'], ['两百年海禁松口,美洲白银自此涌入。','Two centuries of prohibition ease; American silver pours in.']],
 [1578, ['《本草纲目》','The Compendium of Materia Medica'], ['李时珍写了二十七年,收药一千八百余种。','Li Shizhen: twenty-seven years, 1,800 substances.']],
 [1582, ['利玛窦入华','Matteo Ricci arrives'], ['穿儒服、说汉话,把欧几里得带了进来。','In scholar\'s robes, speaking Chinese, carrying Euclid.']],
 [1602, ['《坤舆万国全图》','The Map of Ten Thousand Countries'], ['中国人第一次看到完整的世界。','China sees the whole world for the first time.']],
 [1616, ['努尔哈赤建后金','Nurhaci founds the Later Jin'], ['以十三副遗甲起兵,三十三年后建国称汗。','He started with thirteen suits of armour; thirty-three years later, a state.']],
 [1619, ['萨尔浒之战','Sarhu'], ['明军四路分进十余万,五日内被各个击破;辽东攻守易势,再未夺回。','Four Ming columns, over 100,000 men, destroyed one by one in five days — the initiative in the northeast never came back.']],
 [1637, ['《天工开物》','Exploitation of the Works of Nature'], ['宋应星记下一百三十项工艺,从种稻到炼铁。','Song Yingxing records 130 crafts, from rice to iron.']] ],
};
