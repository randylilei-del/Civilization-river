/* ---------- 城市的代表古迹(v198,Ray 提议) ----------
   键 = GEO_CITY 的中文城市名,值 = 最多三处 { n:[中英名], y:年份, e:[朝代中英], ca?:年份为约值 }。
   渲染在城市总结段下方,一行一处:「兵马俑 · 秦 · 前210」。

   为什么要有这一层:总结段讲的是「这座城为什么在这里」,抽象;古迹是**摸得着的东西**,
   7 岁的孩子记住兵马俑比记住「关中是个盒子」容易得多。而且每处标明年代之后,
   一座城的几处古迹自己就排成了一条时间线——西安的兵马俑(秦)、大雁塔(唐)、城墙(明),
   一眼看出这座城被三个不同的时代分别留下过什么。

   收录纪律:
   1. **必须是今天还看得见的实物**(遗址、建筑、造像、城墙),不收「某某在此写过一首诗」。
   2. 年份取**建成/落成**年,不是使用年代;只考订得出一个大概的用 ca:1 标出来。
   3. 朝代/时期用建成时那个,不用后来重修的——西安城墙是明代的,尽管唐代那圈更大。
   4. 最多三处:这一层是引子不是清单,给孩子三个抓手就够了。
   5. 拿不准年代或朝代的宁可不收。

   ⚠ 顺带查出来的**站内年表覆盖缺口**(古迹年份是对的,是站里那一年没有色带盖住这座城;
   audit 曾为此写过一条规则,因 0% 准确率做废,把结论记在这里):
   莫高窟 366(敦煌)、艾提尕尔清真寺 1442(喀什)、大金塔约 1000(仰光)、
   圣彼得大教堂 1626(罗马)、卢浮宫 1546(巴黎)、圣斯蒂芬大教堂 1160(维也纳)、
   勃兰登堡门 1791(柏林)、骑士岛教堂约 1300(斯德哥尔摩)、法尼尔厅 1742(波士顿)。
   补色带时可对照此表。 */
const CITY_SITES = {
/* 中国 */
'西安': [
 { n:['秦始皇兵马俑','the Terracotta Army'], y:-210, e:['秦','Qin'] },
 { n:['大雁塔','the Giant Wild Goose Pagoda'], y:652, e:['唐','Tang'] },
 { n:['西安城墙','the city walls'], y:1378, e:['明','Ming'] },
],
'洛阳': [
 { n:['白马寺','the White Horse Temple'], y:68, e:['东汉','Eastern Han'] },
 { n:['龙门石窟','the Longmen Grottoes'], y:493, e:['北魏至唐','Northern Wei to Tang'] },
 { n:['隋唐洛阳城遗址','the Sui-Tang city site'], y:605, e:['隋','Sui'] },
],
'北京': [
 { n:['卢沟桥','the Marco Polo Bridge'], y:1192, e:['金','Jin'] },
 { n:['紫禁城','the Forbidden City'], y:1420, e:['明','Ming'] },
 { n:['天坛','the Temple of Heaven'], y:1420, e:['明','Ming'] },
],
'南京': [
 { n:['明孝陵','the Ming Xiaoling Mausoleum'], y:1405, e:['明','Ming'] },
 { n:['明城墙','the Ming city wall'], y:1386, e:['明','Ming'] },
 { n:['夫子庙','the Confucius Temple'], y:1034, e:['北宋','Northern Song'] },
],
'杭州': [
 { n:['六和塔','the Liuhe Pagoda'], y:970, e:['北宋','Northern Song'] },
 { n:['灵隐寺','the Lingyin Temple'], y:326, e:['东晋','Eastern Jin'] },
 { n:['苏堤','the Su Causeway'], y:1090, e:['北宋','Northern Song'] },
],
'开封': [
 { n:['铁塔','the Iron Pagoda'], y:1049, e:['北宋','Northern Song'] },
 { n:['繁塔','the Po Pagoda'], y:977, e:['北宋','Northern Song'] },
],
'成都': [
 { n:['都江堰','the Dujiangyan irrigation works'], y:-256, e:['战国·秦','Warring States Qin'] },
 { n:['武侯祠','the Wuhou Shrine'], y:223, e:['三国·蜀汉','Shu Han'], ca:1 },
 { n:['金沙遗址','the Jinsha site'], y:-1000, e:['商周之际','late Shang'], ca:1 },
],
'苏州': [
 { n:['虎丘塔','the Tiger Hill Pagoda'], y:961, e:['五代·吴越','Wuyue'] },
 { n:['拙政园','the Humble Administrator\'s Garden'], y:1509, e:['明','Ming'] },
 { n:['盘门','the Pan Gate'], y:-514, e:['春秋·吴','Wu'], ca:1 },
],
'大同': [
 { n:['云冈石窟','the Yungang Grottoes'], y:460, e:['北魏','Northern Wei'] },
 { n:['悬空寺','the Hanging Monastery'], y:491, e:['北魏','Northern Wei'] },
 { n:['华严寺','the Huayan Temple'], y:1038, e:['辽','Liao'] },
],
'太原': [
 { n:['晋祠圣母殿','the Jinci Sacred Lady Hall'], y:1023, e:['北宋','Northern Song'] },
 { n:['天龙山石窟','the Tianlongshan Grottoes'], y:560, e:['北齐至唐','Northern Qi to Tang'] },
],
'广州': [
 { n:['南越王墓','the Tomb of the Nanyue King'], y:-122, e:['西汉·南越','Nanyue'] },
 { n:['怀圣寺光塔','the Huaisheng Mosque minaret'], y:627, e:['唐','Tang'], ca:1 },
 { n:['六榕寺花塔','the Flower Pagoda'], y:537, e:['南朝·梁','Liang'] },
],
'泉州': [
 { n:['开元寺双塔','the twin pagodas of Kaiyuan Temple'], y:1238, e:['南宋','Southern Song'] },
 { n:['清净寺','the Qingjing Mosque'], y:1009, e:['北宋','Northern Song'] },
 { n:['洛阳桥','the Luoyang Bridge'], y:1059, e:['北宋','Northern Song'] },
],
'敦煌': [
 { n:['莫高窟','the Mogao Caves'], y:366, e:['十六国·前秦','Former Qin'] },
 { n:['玉门关','the Jade Gate'], y:-111, e:['西汉','Western Han'] },
 { n:['汉长城遗址','the Han Great Wall'], y:-101, e:['西汉','Western Han'], ca:1 },
],
'拉萨': [
 { n:['大昭寺','the Jokhang Temple'], y:647, e:['吐蕃','Tibetan Empire'] },
 { n:['布达拉宫','the Potala Palace'], y:1645, e:['清·格鲁派','Qing-era Ganden Phodrang'] },
],
'喀什': [
 { n:['艾提尕尔清真寺','the Id Kah Mosque'], y:1442, e:['明·察合台汗国','Chagatai era'] },
 { n:['香妃墓','the Afaq Khoja Mausoleum'], y:1640, e:['明末','late Ming'] },
],
'长沙': [
 { n:['马王堆汉墓','the Mawangdui tombs'], y:-168, e:['西汉','Western Han'] },
 { n:['岳麓书院','the Yuelu Academy'], y:976, e:['北宋','Northern Song'] },
],
'台北': [
 { n:['艋舺龙山寺','the Longshan Temple'], y:1738, e:['清','Qing'] },
 { n:['台北府城北门','the North Gate of the walled city'], y:1884, e:['清','Qing'] },
],
'香港': [
 { n:['李郑屋汉墓','the Lei Cheng Uk Han tomb'], y:100, e:['东汉','Eastern Han'], ca:1 },
],
/* 东亚其余 · 东南亚 */
'首尔': [
 { n:['景福宫','Gyeongbokgung Palace'], y:1395, e:['朝鲜王朝','Joseon'] },
 { n:['宗庙','the Jongmyo Shrine'], y:1394, e:['朝鲜王朝','Joseon'] },
 { n:['崇礼门(南大门)','Namdaemun Gate'], y:1398, e:['朝鲜王朝','Joseon'] },
],
'京都': [
 { n:['清水寺','Kiyomizu-dera'], y:778, e:['奈良末·平安初','late Nara'] },
 { n:['平等院凤凰堂','the Phoenix Hall of Byodo-in'], y:1053, e:['平安','Heian'] },
 { n:['金阁寺','Kinkaku-ji'], y:1397, e:['室町','Muromachi'] },
],
'东京': [
 { n:['浅草寺','Senso-ji'], y:645, e:['飞鸟','Asuka'], ca:1 },
 { n:['江户城遗构(今皇居)','the Edo castle remains'], y:1457, e:['室町','Muromachi'] },
],
'河内': [
 { n:['文庙','the Temple of Literature'], y:1070, e:['李朝','Ly dynasty'] },
 { n:['一柱寺','the One Pillar Pagoda'], y:1049, e:['李朝','Ly dynasty'] },
 { n:['升龙皇城遗址','the Thang Long citadel'], y:1010, e:['李朝','Ly dynasty'] },
],
'吴哥': [
 { n:['吴哥窟','Angkor Wat'], y:1150, e:['高棉','Khmer'] },
 { n:['巴戎寺','the Bayon'], y:1200, e:['高棉','Khmer'], ca:1 },
 { n:['塔布茏寺','Ta Prohm'], y:1186, e:['高棉','Khmer'] },
],
'蒲甘': [
 { n:['阿难陀寺','the Ananda Temple'], y:1105, e:['蒲甘王朝','Pagan kingdom'] },
 { n:['瑞喜宫塔','the Shwezigon Pagoda'], y:1102, e:['蒲甘王朝','Pagan kingdom'] },
],
'仰光': [
 { n:['大金塔','the Shwedagon Pagoda'], y:1000, e:['蒲甘时期','Pagan era'], ca:1 },
],
'曼谷': [
 { n:['玉佛寺','Wat Phra Kaew'], y:1784, e:['却克里王朝','Chakri dynasty'] },
 { n:['卧佛寺','Wat Pho'], y:1788, e:['却克里王朝','Chakri dynasty'] },
],
'马六甲': [
 { n:['圣保罗教堂','St Paul\'s Church'], y:1521, e:['葡萄牙殖民','Portuguese'] },
 { n:['荷兰红屋','the Stadthuys'], y:1650, e:['荷兰殖民','Dutch'] },
],
'雅加达': [
 { n:['法塔希拉广场(旧巴达维亚)','Fatahillah Square'], y:1707, e:['荷属东印度','Dutch East Indies'] },
],
'马尼拉': [
 { n:['圣奥古斯丁教堂','San Agustin Church'], y:1607, e:['西属菲律宾','Spanish Philippines'] },
 { n:['王城区城墙','the Intramuros walls'], y:1590, e:['西属菲律宾','Spanish Philippines'] },
],
/* 南亚 · 中亚 */
'德里': [
 { n:['顾特卜塔','the Qutb Minar'], y:1199, e:['德里苏丹国','Delhi Sultanate'] },
 { n:['胡马雍陵','Humayun\'s Tomb'], y:1572, e:['莫卧儿','Mughal'] },
 { n:['红堡','the Red Fort'], y:1648, e:['莫卧儿','Mughal'] },
],
'瓦拉纳西': [
 { n:['鹿野苑达枚克塔','the Dhamek Stupa at Sarnath'], y:500, e:['笈多','Gupta'] },
],
'巴特那': [
 { n:['华氏城遗址','the Pataliputra ruins'], y:-300, e:['孔雀王朝','Maurya'], ca:1 },
],
'汉皮': [
 { n:['维鲁巴克沙神庙','the Virupaksha Temple'], y:1350, e:['毗奢耶那伽罗','Vijayanagara'], ca:1 },
 { n:['战车神庙(维塔拉)','the stone chariot of Vittala'], y:1520, e:['毗奢耶那伽罗','Vijayanagara'] },
],
'摩亨佐达罗': [
 { n:['大浴场','the Great Bath'], y:-2500, e:['印度河文明','Indus Valley'], ca:1 },
],
'拉合尔': [
 { n:['巴德夏希清真寺','the Badshahi Mosque'], y:1673, e:['莫卧儿','Mughal'] },
 { n:['拉合尔堡','the Lahore Fort'], y:1566, e:['莫卧儿','Mughal'] },
],
'撒马尔罕': [
 { n:['雷吉斯坦广场','the Registan'], y:1420, e:['帖木儿','Timurid'] },
 { n:['古尔·埃米尔陵','the Gur-e-Amir'], y:1404, e:['帖木儿','Timurid'] },
 { n:['乌鲁伯格天文台','Ulugh Beg\'s observatory'], y:1428, e:['帖木儿','Timurid'] },
],
'布哈拉': [
 { n:['萨曼王陵','the Samanid Mausoleum'], y:905, e:['萨曼','Samanid'], ca:1 },
 { n:['卡扬宣礼塔','the Kalyan Minaret'], y:1127, e:['喀喇汗','Karakhanid'] },
],
/* 中东 · 北非 */
'伊斯坦布尔': [
 { n:['圣索菲亚','Hagia Sophia'], y:537, e:['拜占庭','Byzantine'] },
 { n:['托普卡帕宫','Topkapi Palace'], y:1478, e:['奥斯曼','Ottoman'] },
 { n:['苏莱曼尼耶清真寺','the Suleymaniye Mosque'], y:1557, e:['奥斯曼','Ottoman'] },
],
'耶路撒冷': [
 { n:['西墙','the Western Wall'], y:-19, e:['希律时期','Herodian'] },
 { n:['圆顶清真寺','the Dome of the Rock'], y:691, e:['倭马亚','Umayyad'] },
 { n:['圣墓教堂','the Church of the Holy Sepulchre'], y:335, e:['罗马·君士坦丁','Constantinian'] },
],
'大马士革': [
 { n:['倭马亚大清真寺','the Umayyad Mosque'], y:715, e:['倭马亚','Umayyad'] },
],
'巴格达': [
 { n:['穆斯坦西里亚学院','the Mustansiriya Madrasa'], y:1233, e:['阿拔斯','Abbasid'] },
],
'开罗': [
 { n:['吉萨金字塔','the Pyramids of Giza'], y:-2560, e:['古埃及古王国','Old Kingdom'] },
 { n:['伊本·图伦清真寺','the Mosque of Ibn Tulun'], y:879, e:['图伦','Tulunid'] },
 { n:['萨拉丁城堡','the Citadel of Saladin'], y:1183, e:['阿尤布','Ayyubid'] },
],
'伊斯法罕': [
 { n:['伊玛目广场','Naqsh-e Jahan Square'], y:1602, e:['萨法维','Safavid'] },
 { n:['聚礼清真寺','the Jameh Mosque'], y:771, e:['阿拔斯至萨法维','Abbasid to Safavid'] },
],
'非斯': [
 { n:['卡鲁因大学','the Qarawiyyin'], y:859, e:['伊德里斯','Idrisid'] },
],
'巴比伦': [
 { n:['伊什塔尔门遗址','the Ishtar Gate'], y:-575, e:['新巴比伦','Neo-Babylonian'] },
],
'亚历山大': [
 { n:['庞培柱','Pompey\'s Pillar'], y:297, e:['罗马','Roman'] },
 { n:['盖贝依城堡(灯塔旧址)','the Qaitbay Citadel'], y:1477, e:['马穆鲁克','Mamluk'] },
],
/* 欧洲 */
'雅典': [
 { n:['帕特农神庙','the Parthenon'], y:-432, e:['古典希腊','Classical Greece'] },
 { n:['狄俄尼索斯剧场','the Theatre of Dionysus'], y:-325, e:['古典希腊','Classical Greece'] },
],
'罗马': [
 { n:['万神殿','the Pantheon'], y:126, e:['罗马帝国','Roman Empire'] },
 { n:['斗兽场','the Colosseum'], y:80, e:['罗马帝国','Roman Empire'] },
 { n:['圣彼得大教堂','St Peter\'s Basilica'], y:1626, e:['文艺复兴至巴洛克','Renaissance to Baroque'] },
],
'巴黎': [
 { n:['巴黎圣母院','Notre-Dame'], y:1345, e:['哥特时期','Gothic'] },
 { n:['卢浮宫','the Louvre'], y:1546, e:['文艺复兴','Renaissance'] },
 { n:['埃菲尔铁塔','the Eiffel Tower'], y:1889, e:['第三共和国','Third Republic'] },
],
'伦敦': [
 { n:['伦敦塔','the Tower of London'], y:1078, e:['诺曼','Norman'] },
 { n:['威斯敏斯特教堂','Westminster Abbey'], y:1269, e:['哥特时期','Gothic'] },
 { n:['圣保罗大教堂','St Paul\'s Cathedral'], y:1710, e:['斯图亚特末','late Stuart'] },
],
'科尔多瓦': [
 { n:['大清真寺','the Mezquita'], y:786, e:['后倭马亚','Umayyad of Cordoba'] },
 { n:['罗马桥','the Roman Bridge'], y:-45, e:['罗马','Roman'], ca:1 },
],
'威尼斯': [
 { n:['圣马可大教堂','St Mark\'s Basilica'], y:1094, e:['威尼斯共和国','Venetian Republic'] },
 { n:['总督宫','the Doge\'s Palace'], y:1424, e:['威尼斯共和国','Venetian Republic'] },
],
'佛罗伦萨': [
 { n:['圣母百花大教堂穹顶','Brunelleschi\'s dome'], y:1436, e:['文艺复兴','Renaissance'] },
 { n:['老桥','the Ponte Vecchio'], y:1345, e:['中世纪晚期','late medieval'] },
],
'莫斯科': [
 { n:['圣瓦西里大教堂','St Basil\'s Cathedral'], y:1561, e:['沙俄','Tsardom of Russia'] },
 { n:['克里姆林宫城墙','the Kremlin walls'], y:1495, e:['莫斯科大公国','Grand Duchy of Moscow'] },
],
'维也纳': [
 { n:['圣斯蒂芬大教堂','St Stephen\'s Cathedral'], y:1160, e:['罗曼至哥特','Romanesque to Gothic'] },
 { n:['美泉宫','Schonbrunn Palace'], y:1749, e:['哈布斯堡','Habsburg'] },
],
'布拉格': [
 { n:['查理大桥','the Charles Bridge'], y:1402, e:['卢森堡王朝','Luxembourg dynasty'] },
 { n:['布拉格城堡','Prague Castle'], y:880, e:['普舍美斯','Premyslid'], ca:1 },
],
'马德里': [
 { n:['马约尔广场','the Plaza Mayor'], y:1619, e:['哈布斯堡西班牙','Habsburg Spain'] },
],
'里斯本': [
 { n:['热罗尼莫斯修道院','the Jeronimos Monastery'], y:1601, e:['曼努埃尔时期','Manueline'] },
 { n:['贝伦塔','the Belem Tower'], y:1519, e:['曼努埃尔时期','Manueline'] },
],
'柏林': [
 { n:['勃兰登堡门','the Brandenburg Gate'], y:1791, e:['普鲁士','Prussia'] },
],
'斯德哥尔摩': [
 { n:['骑士岛教堂','Riddarholmen Church'], y:1300, e:['中世纪','medieval'], ca:1 },
],
/* 非洲 */
'廷巴克图': [
 { n:['津加里贝尔清真寺','the Djinguereber Mosque'], y:1327, e:['马里帝国','Mali Empire'] },
 { n:['桑科雷清真寺','the Sankore Mosque'], y:1400, e:['马里帝国','Mali Empire'], ca:1 },
],
'阿克苏姆': [
 { n:['阿克苏姆方尖碑','the Aksum obelisks'], y:350, e:['阿克苏姆','Aksumite'], ca:1 },
],
'大津巴布韦': [
 { n:['大围场','the Great Enclosure'], y:1250, e:['大津巴布韦','Great Zimbabwe'], ca:1 },
],
'基尔瓦': [
 { n:['大清真寺','the Great Mosque'], y:1100, e:['基尔瓦苏丹国','Kilwa Sultanate'], ca:1 },
 { n:['胡苏尼·库布瓦宫','Husuni Kubwa'], y:1320, e:['基尔瓦苏丹国','Kilwa Sultanate'], ca:1 },
],
'蒙巴萨': [
 { n:['耶稣堡','Fort Jesus'], y:1596, e:['葡萄牙殖民','Portuguese'] },
],
'开普敦': [
 { n:['好望角城堡','the Castle of Good Hope'], y:1679, e:['荷属开普','Dutch Cape'] },
],
'麦罗埃': [
 { n:['麦罗埃金字塔群','the Nubian pyramids'], y:-300, e:['库施','Kush'], ca:1 },
],
/* 美洲 · 大洋洲 */
'墨西哥城': [
 { n:['大神庙遗址','the Templo Mayor'], y:1487, e:['阿兹特克','Aztec'] },
 { n:['大教堂','the Metropolitan Cathedral'], y:1656, e:['西属新西班牙','New Spain'] },
],
'特奥蒂瓦坎': [
 { n:['太阳金字塔','the Pyramid of the Sun'], y:200, e:['特奥蒂瓦坎','Teotihuacan'], ca:1 },
 { n:['月亮金字塔','the Pyramid of the Moon'], y:250, e:['特奥蒂瓦坎','Teotihuacan'], ca:1 },
],
'奇琴伊察': [
 { n:['库库尔坎金字塔','El Castillo'], y:1000, e:['后古典玛雅','Postclassic Maya'], ca:1 },
 { n:['大球场','the Great Ball Court'], y:864, e:['后古典玛雅','Postclassic Maya'] },
],
'蒂卡尔': [
 { n:['一号神庙','Temple I'], y:732, e:['古典玛雅','Classic Maya'] },
],
'库斯科': [
 { n:['萨克塞华曼','Sacsayhuaman'], y:1450, e:['印加','Inca'], ca:1 },
 { n:['太阳神殿(科里坎查)','the Qorikancha'], y:1438, e:['印加','Inca'], ca:1 },
],
'利马': [
 { n:['圣弗朗西斯科修道院','the Monastery of San Francisco'], y:1674, e:['西属秘鲁','Viceroyalty of Peru'] },
],
'哈瓦那': [
 { n:['莫罗城堡','the Morro Castle'], y:1630, e:['西属古巴','Spanish Cuba'] },
],
'卡霍基亚': [
 { n:['僧侣丘','Monks Mound'], y:1100, e:['密西西比文化','Mississippian'], ca:1 },
],
'纽约': [
 { n:['自由女神像','the Statue of Liberty'], y:1886, e:['镀金时代','Gilded Age'] },
 { n:['布鲁克林大桥','the Brooklyn Bridge'], y:1883, e:['镀金时代','Gilded Age'] },
],
'波士顿': [
 { n:['法尼尔厅','Faneuil Hall'], y:1742, e:['英属北美','British America'] },
],
'华盛顿': [
 { n:['国会大厦','the Capitol'], y:1800, e:['建国初期','early Republic'] },
],
'蒙特利尔': [
 { n:['圣母大教堂','Notre-Dame Basilica'], y:1829, e:['英属北美','British North America'] },
],
'悉尼': [
 { n:['海德公园兵营','the Hyde Park Barracks'], y:1819, e:['流放地时期','convict era'] },
 { n:['悉尼歌剧院','the Sydney Opera House'], y:1973, e:['战后现代','postwar modern'] },
],
'奥克兰': [
 { n:['一树山毛利要塞遗迹','the Maungakiekie pa terraces'], y:1600, e:['毛利','Maori'], ca:1 },
],
/* v201:补齐余下 43 座(金沙萨有意留空:查不到年代与来历都拿得准的实物,按纪律 5 不收) */
'乌兰巴托': [
 { n:['甘丹寺','Gandan Monastery'], y:1838, e:['清代蒙古','Qing-era Mongolia'] },
 { n:['博格达汗宫','the Bogd Khan Palace'], y:1903, e:['清末','late Qing'] },
],
'哈拉和林': [
 { n:['哈拉和林城遗址','the Karakorum city site'], y:1235, e:['蒙古帝国','Mongol Empire'] },
 { n:['额尔德尼召','Erdene Zuu Monastery'], y:1585, e:['北元·蒙古','Northern Yuan Mongolia'] },
],
'平壤': [
 { n:['高句丽古墓群','the Koguryo tombs'], y:500, e:['高句丽','Goguryeo'], ca:1 },
 { n:['大同门','the Taedong Gate'], y:1635, e:['朝鲜王朝','Joseon'] },
],
'巨港': [
 { n:['巨港大清真寺','the Great Mosque of Palembang'], y:1748, e:['巨港苏丹国','Palembang Sultanate'] },
 { n:['安佩拉大桥','the Ampera Bridge'], y:1965, e:['印度尼西亚','Indonesia'] },
],
'新加坡': [
 { n:['天福宫','Thian Hock Keng Temple'], y:1842, e:['英属海峡殖民地','British Straits Settlements'] },
 { n:['莱佛士酒店','Raffles Hotel'], y:1887, e:['英属海峡殖民地','British Straits Settlements'] },
 { n:['鱼尾狮','the Merlion'], y:1972, e:['新加坡共和国','Republic of Singapore'] },
],
'吉隆坡': [
 { n:['苏丹阿都沙末大厦','the Sultan Abdul Samad Building'], y:1897, e:['英属马来亚','British Malaya'] },
 { n:['占美清真寺','Masjid Jamek'], y:1909, e:['英属马来亚','British Malaya'] },
 { n:['双子塔','the Petronas Towers'], y:1998, e:['马来西亚','Malaysia'] },
],
'胡志明市': [
 { n:['西贡圣母大教堂','Notre-Dame Cathedral of Saigon'], y:1880, e:['法属印度支那','French Indochina'] },
 { n:['西贡中央邮局','the Central Post Office'], y:1891, e:['法属印度支那','French Indochina'] },
 { n:['统一宫','the Reunification Palace'], y:1966, e:['越南共和国','South Vietnam'] },
],
'孟买': [
 { n:['象岛石窟','the Elephanta Caves'], y:550, e:['卡拉丘里王朝','Kalachuri'], ca:1 },
 { n:['贾特拉帕蒂·希瓦吉终点站','Chhatrapati Shivaji Terminus'], y:1887, e:['英属印度','British India'] },
 { n:['印度门','the Gateway of India'], y:1924, e:['英属印度','British India'] },
],
'加尔各答': [
 { n:['维多利亚纪念堂','the Victoria Memorial'], y:1921, e:['英属印度','British India'] },
 { n:['豪拉大桥','the Howrah Bridge'], y:1943, e:['英属印度','British India'] },
],
'科伦坡': [
 { n:['沃尔文达尔教堂','the Wolvendaal Church'], y:1757, e:['荷属锡兰','Dutch Ceylon'] },
 { n:['独立纪念堂','Independence Memorial Hall'], y:1953, e:['锡兰自治领','Dominion of Ceylon'] },
],
'塔什干': [
 { n:['库克尔达什经学院','the Kukeldash Madrasah'], y:1570, e:['布哈拉汗国','Bukhara Khanate'] },
 { n:['塔什干电视塔','the Tashkent TV Tower'], y:1985, e:['苏联','Soviet'] },
],
'阿拉木图': [
 { n:['升天大教堂','the Ascension Cathedral'], y:1907, e:['俄罗斯帝国','Russian Empire'] },
 { n:['麦迪奥高山滑冰场','the Medeu skating rink'], y:1972, e:['苏联','Soviet'] },
],
'麦加': [
 { n:['克尔白·天房(现存墙体)','the Kaaba (present walls)'], y:1630, e:['奥斯曼','Ottoman'], ca:1 },
 { n:['麦加皇家钟塔','the Makkah Clock Tower'], y:2012, e:['沙特阿拉伯','Saudi Arabia'] },
],
'麦地那': [
 { n:['库巴清真寺','the Quba Mosque'], y:622, e:['伊斯兰初期','early Islam'] },
 { n:['先知清真寺','the Prophet\'s Mosque'], y:622, e:['伊斯兰初期','early Islam'] },
],
'特拉布宗': [
 { n:['苏美拉修道院','Sumela Monastery'], y:386, e:['罗马帝国末期','late Roman'], ca:1 },
 { n:['特拉布宗圣索菲亚教堂','Hagia Sophia of Trebizond'], y:1260, e:['特拉比松帝国','Empire of Trebizond'], ca:1 },
],
'德黑兰': [
 { n:['古列斯坦宫','the Golestan Palace'], y:1865, e:['恺加','Qajar'], ca:1 },
 { n:['自由纪念塔','the Azadi Tower'], y:1971, e:['巴列维','Pahlavi'] },
],
'安卡拉': [
 { n:['奥古斯都神庙','the Temple of Augustus'], y:-25, e:['罗马帝国','Roman'], ca:1 },
 { n:['凯末尔陵','Anıtkabir'], y:1953, e:['土耳其共和国','Republic of Turkey'] },
],
'突尼斯': [
 { n:['迦太基安东尼浴场','the Antonine Baths of Carthage'], y:162, e:['罗马帝国','Roman'] },
 { n:['宰图纳大清真寺','the Zaytuna Mosque'], y:864, e:['阿格拉布','Aghlabid'] },
],
'喀布尔': [
 { n:['巴布尔花园','the Gardens of Babur'], y:1528, e:['莫卧儿','Mughal'], ca:1 },
 { n:['达鲁拉曼宫','the Darul Aman Palace'], y:1927, e:['阿富汗王国','Kingdom of Afghanistan'] },
],
'迪拜': [
 { n:['法希迪堡','Al Fahidi Fort'], y:1787, e:['迪拜建镇之初','early Dubai'] },
 { n:['哈利法塔','the Burj Khalifa'], y:2010, e:['阿联酋','United Arab Emirates'] },
],
'华沙': [
 { n:['华沙王宫','the Royal Castle'], y:1619, e:['波兰-立陶宛','Polish-Lithuanian Commonwealth'] },
 { n:['瓦津基宫','Łazienki Palace'], y:1793, e:['波兰-立陶宛末期','late Commonwealth'] },
 { n:['文化科学宫','the Palace of Culture and Science'], y:1955, e:['波兰人民共和国','communist Poland'] },
],
'基辅': [
 { n:['圣索菲亚大教堂','Saint Sophia Cathedral'], y:1037, e:['基辅罗斯','Kievan Rus'], ca:1 },
 { n:['洞窟修道院','the Kyiv Pechersk Lavra'], y:1051, e:['基辅罗斯','Kievan Rus'] },
 { n:['祖国母亲雕像','the Motherland Monument'], y:1981, e:['苏联','Soviet'] },
],
'阿姆斯特丹': [
 { n:['老教堂','the Oude Kerk'], y:1306, e:['荷兰伯国','County of Holland'] },
 { n:['西教堂','the Westerkerk'], y:1631, e:['荷兰共和国','Dutch Republic'] },
 { n:['王宫(原市政厅)','the Royal Palace (old town hall)'], y:1655, e:['荷兰共和国','Dutch Republic'] },
],
'米兰': [
 { n:['圣安布罗焦教堂(现建筑)','the Basilica of Sant\'Ambrogio (present church)'], y:1099, e:['罗马式时期','Romanesque'] },
 { n:['米兰大教堂(动工)','the Duomo (begun)'], y:1386, e:['维斯孔蒂时期','Visconti Milan'] },
 { n:['《最后的晚餐》壁画','The Last Supper mural'], y:1498, e:['斯福尔扎时期','Sforza Milan'] },
],
'巴塞罗那': [
 { n:['巴塞罗那大教堂','Barcelona Cathedral'], y:1448, e:['阿拉贡王国','Crown of Aragon'] },
 { n:['圣家堂(动工)','the Sagrada Família (begun)'], y:1882, e:['西班牙王国','Kingdom of Spain'] },
 { n:['米拉之家','Casa Milà'], y:1912, e:['西班牙王国','Kingdom of Spain'] },
],
'加奥': [
 { n:['阿斯基亚陵','the Tomb of Askia'], y:1495, e:['桑海帝国','Songhai'] },
],
'卡诺': [
 { n:['卡诺古城墙','the Kano city walls'], y:1150, e:['豪萨城邦','Hausa city-states'], ca:1 },
 { n:['埃米尔宫(吉丹·伦法)','the Emir\'s Palace (Gidan Rumfa)'], y:1480, e:['豪萨城邦','Hausa city-states'], ca:1 },
],
'亚的斯亚贝巴': [
 { n:['圣乔治大教堂','St George\'s Cathedral'], y:1911, e:['埃塞俄比亚帝国','Ethiopian Empire'] },
 { n:['三一大教堂','Holy Trinity Cathedral'], y:1942, e:['埃塞俄比亚帝国','Ethiopian Empire'] },
 { n:['非洲联盟会议中心','the African Union headquarters'], y:2012, e:['埃塞俄比亚','Ethiopia'] },
],
'拉各斯': [
 { n:['尼日利亚国家剧院','the National Theatre'], y:1976, e:['尼日利亚','Nigeria'] },
],
'内罗毕': [
 { n:['卡伦·布里克森故居','the Karen Blixen house'], y:1912, e:['英属东非','British East Africa'] },
 { n:['肯雅塔国际会议中心','the Kenyatta International Convention Centre'], y:1973, e:['肯尼亚','Kenya'] },
],
'约翰内斯堡': [
 { n:['老堡垒(宪法山)','the Old Fort on Constitution Hill'], y:1893, e:['德兰士瓦共和国','South African Republic'] },
 { n:['曼德拉故居(索韦托)','Mandela House in Soweto'], y:1945, e:['南非联邦','Union of South Africa'] },
],
'波哥大': [
 { n:['波哥大大教堂','the Cathedral of Bogotá'], y:1823, e:['大哥伦比亚','Gran Colombia'] },
 { n:['蒙塞拉特山圣殿(现建筑)','the Monserrate sanctuary (present church)'], y:1925, e:['哥伦比亚','Colombia'] },
],
'布宜诺斯艾利斯': [
 { n:['卡比尔多市政厅','the Cabildo'], y:1751, e:['西属美洲','Spanish colonial'], ca:1 },
 { n:['科隆剧院','the Teatro Colón'], y:1908, e:['阿根廷','Argentina'] },
 { n:['方尖碑','the Obelisk'], y:1936, e:['阿根廷','Argentina'] },
],
'里约热内卢': [
 { n:['圣本笃修道院','the São Bento Monastery'], y:1671, e:['葡属巴西','Portuguese Brazil'] },
 { n:['卡里奥卡渡槽(拉帕拱桥)','the Carioca Aqueduct (Lapa Arches)'], y:1750, e:['葡属巴西','Portuguese Brazil'] },
 { n:['救世基督像','Christ the Redeemer'], y:1931, e:['巴西','Brazil'] },
],
'圣地亚哥': [
 { n:['圣地亚哥大教堂','the Metropolitan Cathedral'], y:1800, e:['西属美洲','Spanish colonial'] },
 { n:['莫内达宫','La Moneda'], y:1805, e:['西属美洲','Spanish colonial'] },
],
'洛杉矶': [
 { n:['老广场天使女王教堂','the Plaza Church'], y:1822, e:['墨西哥时期','Mexican California'] },
 { n:['好莱坞标志','the Hollywood Sign'], y:1923, e:['美国','United States'] },
 { n:['格里菲斯天文台','Griffith Observatory'], y:1935, e:['美国','United States'] },
],
'旧金山': [
 { n:['多洛雷斯传教所','Mission Dolores'], y:1791, e:['西属加州','Spanish California'] },
 { n:['恶魔岛监狱','the Alcatraz cellhouse'], y:1912, e:['美国','United States'] },
 { n:['金门大桥','the Golden Gate Bridge'], y:1937, e:['美国','United States'] },
],
'芝加哥': [
 { n:['芝加哥水塔','the Chicago Water Tower'], y:1869, e:['美国','United States'] },
 { n:['罗比之家','the Robie House'], y:1910, e:['美国','United States'] },
 { n:['威利斯大厦(原西尔斯大厦)','the Willis (Sears) Tower'], y:1973, e:['美国','United States'] },
],
'西雅图': [
 { n:['派克市场','Pike Place Market'], y:1907, e:['美国','United States'] },
 { n:['太空针塔','the Space Needle'], y:1962, e:['美国','United States'] },
],
'迈阿密': [
 { n:['维兹卡亚庄园','the Vizcaya villa'], y:1916, e:['美国','United States'] },
 { n:['自由塔','the Freedom Tower'], y:1925, e:['美国','United States'] },
],
'多伦多': [
 { n:['老市政厅','the Old City Hall'], y:1899, e:['加拿大','Canada'] },
 { n:['卡萨罗马城堡','Casa Loma'], y:1914, e:['加拿大','Canada'] },
 { n:['加拿大国家电视塔','the CN Tower'], y:1976, e:['加拿大','Canada'] },
],
'温哥华': [
 { n:['海洋大厦','the Marine Building'], y:1930, e:['加拿大','Canada'] },
 { n:['狮门大桥','the Lions Gate Bridge'], y:1938, e:['加拿大','Canada'] },
],
'墨尔本': [
 { n:['皇家展览馆','the Royal Exhibition Building'], y:1880, e:['维多利亚殖民地','Colony of Victoria'] },
 { n:['弗林德斯街车站','Flinders Street Station'], y:1910, e:['澳大利亚联邦','Australia'] },
],
};
