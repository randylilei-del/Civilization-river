/* ---------- 城市照片(v202,Ray 提议:「缺真实的图片」) ----------
   键 = GEO_CITY 的中文城市名,值 = 最多三张 { f:Commons 文件名, h:'x/xy' 路径哈希前缀, t:[中英说明], by:作者, lic:许可, s?:1 原图不足 960px 时直接取原图 }。
   图来自 Wikimedia Commons,全部是 CC / 公有领域许可,渲染时带作者与许可署名。

   ⚠ 这是站里第二处「点了才发请求」的外部资源(第一处是视频):面板里只放一个「看照片」按钮,
   **点了才插 <img>**,不点则页面对外零请求——离线与「不引入外部资源」铁律的口径同 VIDEO。
   URL 在渲染时拼:https://upload.wikimedia.org/wikipedia/commons/thumb/{h}/{f}/960px-{f}(s:1 的取 /commons/{h}/{f})。
   ⚠ 宽度必须用 960 这一档:2026-08 实测 Commons 对站外引用只出「标准档」缩略图(960 / 1280 有,800 / 640 / 320 全 404),
   索性与 API 返回的一致,别自作主张改小。

   选图流程(v202):每处古迹取对应英文维基条目的首图 → 查 Commons 存在与许可 → 220 张缩略图人眼过一遍,
   剔掉地图、logo、无关物、纯特写(共剔 20 张,见 CHANGELOG v202)。没有古迹图的城取城市条目首图(标城市名)。
   说明文字 t 用古迹表里的名字去掉「(动工)/(现建筑)」这类标记。
   巴特那没有拿得准的图,留空——没条目的城市不渲染按钮。 */
const CITY_PHOTO = {
'西安': [
 { f:'51714-Terracota-Army.jpg', h:'8/88', t:['秦始皇兵马俑','the Terracotta Army'], by:'xiquinhosilva', lic:'CC BY 2.0' },
 { f:'Giant_Wild_Goose_Pagoda.jpg', h:'1/13', t:['大雁塔','the Giant Wild Goose Pagoda'], by:'Alex Kwok', lic:'CC BY-SA 3.0' },
 { f:'City_wall_of_Xi\'an_51550-Xian_(27959363326).jpg', h:'3/32', t:['西安城墙','the city walls'], by:'xiquinhosilva', lic:'CC BY 2.0' },
],
'洛阳': [
 { f:'27427-Luoyang_(49067744628).jpg', h:'b/b4', t:['龙门石窟','the Longmen Grottoes'], by:'xiquinhosilva', lic:'CC BY 2.0' },
],
'北京': [
 { f:'Lugouqiao-2014.jpg', h:'2/22', t:['卢沟桥','the Marco Polo Bridge'], by:'Alanba42', lic:'CC BY-SA 4.0' },
 { f:'The_Forbidden_City_-_View_from_Coal_Hill.jpg', h:'e/ef', t:['紫禁城','the Forbidden City'], by:'Pixelflake', lic:'CC BY-SA 3.0' },
 { f:'Temple_of_Heaven_20160323_01.jpg', h:'5/5f', t:['天坛','the Temple of Heaven'], by:'Shujianyang', lic:'CC BY-SA 4.0' },
],
'南京': [
 { f:'Nanjing_Ming_Xiaoling_2017.11.11_08-10-27.jpg', h:'d/d1', t:['明孝陵','the Ming Xiaoling Mausoleum'], by:'Zhangzhugang', lic:'CC BY-SA 4.0' },
 { f:'KuiGuangGe_of_Nanjing_Confucian_Temple.jpg', h:'0/0a', t:['夫子庙','the Confucius Temple'], by:'wang leon from Nanjing, China', lic:'CC BY 2.0', s:1 },
],
'杭州': [
 { f:'20240128_Liuhe_Pagoda_01.jpg', h:'d/dc', t:['六和塔','the Liuhe Pagoda'], by:'Windmemories', lic:'CC BY-SA 4.0' },
 { f:'Lingyin_Temple,_Hangzhou_20161003.jpg', h:'6/66', t:['灵隐寺','the Lingyin Temple'], by:'Tyg728', lic:'CC BY-SA 4.0' },
],
'开封': [
 { f:'Iron_Pagoda_Cropped.jpg', h:'b/b2', t:['铁塔','the Iron Pagoda'], by:'Robinlun', lic:'CC BY-SA 4.0' },
],
'成都': [
 { f:'Dujiang_Weir.jpg', h:'a/a7', t:['都江堰','the Dujiangyan irrigation works'], by:'星星', lic:'CC BY-SA 4.0' },
 { f:'金沙遗址_Jinsha_Site_2018.jpg', h:'8/8e', t:['金沙遗址','the Jinsha site'], by:'xiquinhosilva', lic:'CC BY 2.0' },
],
'广州': [
 { f:'Huaisheng_Mosque_Dec_2007.jpg', h:'7/7f', t:['怀圣寺光塔','the Huaisheng Mosque minaret'], by:'Ismaila1977', lic:'Public domain' },
],
'泉州': [
 { f:'Quanzhou_Kaiyuan_Temple-the_Hall_of_Mahavira.jpg', h:'4/4a', t:['开元寺双塔','the twin pagodas of Kaiyuan Temple'], by:'Tom@HK', lic:'CC BY 2.0' },
 { f:'20230130_Qingjing_Mosque_01.jpg', h:'6/60', t:['清净寺','the Qingjing Mosque'], by:'Windmemories', lic:'CC BY-SA 4.0' },
 { f:'Luoyang_Bridge,_Quanzhou_(20201001150149).jpg', h:'8/8e', t:['洛阳桥','the Luoyang Bridge'], by:'N509FZ', lic:'CC BY-SA 4.0' },
],
'敦煌': [
 { f:'Mogao_Caves_(54376969262).jpg', h:'9/9e', t:['莫高窟','the Mogao Caves'], by:'xiquinhosilva', lic:'CC BY 2.0' },
 { f:'Dunhuang.yumenguan.jpg', h:'a/af', t:['玉门关','the Jade Gate'], by:'Popolon', lic:'CC BY-SA 3.0' },
],
'喀什': [
 { f:'Hëytgah_Mosque,_Kashi_(20230923100109).jpg', h:'7/7d', t:['艾提尕尔清真寺','the Id Kah Mosque'], by:'N509FZ', lic:'CC BY-SA 4.0' },
 { f:'Afaq_Khoja_Mausoleum_(2017,_crop).jpg', h:'f/fb', t:['香妃墓','the Afaq Khoja Mausoleum'], by:'David Stanley from Nanaimo, Canada', lic:'CC BY 2.0' },
],
'拉萨': [
 { f:'Jokhang_Temple_in_Tibet.jpg', h:'a/ab', t:['大昭寺','the Jokhang Temple'], by:'onwardtibet.org', lic:'CC BY-SA 2.0', s:1 },
 { f:'Potala_Palace_HQ.jpg', h:'b/b6', t:['布达拉宫','the Potala Palace'], by:'Lhasa Government', lic:'CC BY-SA 4.0' },
],
'苏州': [
 { f:'2024-Apr_Suzhou_-_Tiger_Hill_Pagoda_虎丘塔_(Huqiu_Ta)_-_img_05.jpg', h:'c/c6', t:['虎丘塔','the Tiger Hill Pagoda'], by:'Chainwit', lic:'CC BY 4.0' },
 { f:'Suzhou_Zhuozheng_Yuan_2015.04.23_08-13-49.jpg', h:'d/de', t:['拙政园','the Humble Administrator\'s Garden'], by:'Zhangzhugang', lic:'CC BY-SA 4.0' },
 { f:'Land_Gate_of_Pan_Men.jpg', h:'d/d2', t:['盘门','the Pan Gate'], by:'钉钉', lic:'CC BY-SA 4.0' },
],
'大同': [
 { f:'61292-Yungang-Grottoes_(28498548881).jpg', h:'9/90', t:['云冈石窟','the Yungang Grottoes'], by:'xiquinhosilva', lic:'CC BY 2.0' },
 { f:'Hangingtemple20190929.jpg', h:'d/de', t:['悬空寺','the Hanging Monastery'], by:'Charlie fong', lic:'CC BY-SA 4.0' },
 { f:'Datong_Huayan_Si_2013.08.29_08-24-19.jpg', h:'7/7a', t:['华严寺','the Huayan Temple'], by:'Zhangzhugang', lic:'CC BY-SA 3.0' },
],
'太原': [
 { f:'Tianlongshan_Grotto_-_Manshan_Pavillion,_Taiyuan,_Shanxi.JPG', h:'9/9b', t:['天龙山石窟','the Tianlongshan Grottoes'], by:'Underbar dk', lic:'CC BY-SA 4.0' },
],
'长沙': [
 { f:'Lacquer_Coffin_Unearthed_from_the_2nd-century-BC_Han_Tomb_No.1_at_Mawangdui_2011-07.JPG', h:'c/c9', t:['马王堆汉墓','the Mawangdui tombs'], by:'猫猫的日记本', lic:'CC BY-SA 4.0' },
 { f:'Yuelu_Academy_10844-Changsha_(48757566176).jpg', h:'f/f4', t:['岳麓书院','the Yuelu Academy'], by:'xiquinhosilva', lic:'CC BY 2.0' },
],
'乌兰巴托': [
 { f:'Gandantegchinlen_Monastery_(2024).jpg', h:'f/ff', t:['甘丹寺','Gandan Monastery'], by:'Chongkian', lic:'CC BY-SA 4.0' },
],
'哈拉和林': [
 { f:'Świątynia_Zachodnia_w_klasztorze_Erdene_Dzuu_01.jpg', h:'4/4c', t:['额尔德尼召','Erdene Zuu Monastery'], by:'Marcin Konsek', lic:'CC BY-SA 4.0' },
],
'首尔': [
 { f:'광화문_월대.jpg', h:'6/63', t:['景福宫','Gyeongbokgung Palace'], by:'서울관광 아카이브', lic:'KOGL Type 1' },
 { f:'Jeongjeon,_Jongmyo_(Autumn,_2012).jpg', h:'1/1a', t:['宗庙','the Jongmyo Shrine'], by:'문화재청', lic:'KOGL Type 1' },
 { f:'Sungnyemun_Gate,_front,_2013.jpg', h:'8/81', t:['崇礼门(南大门)','Namdaemun Gate'], by:'DoulosCore', lic:'CC BY-SA 3.0' },
],
'平壤': [
 { f:'Tomb_of_King_Tongmyong.jpg', h:'d/d4', t:['高句丽古墓群','the Koguryo tombs'], by:'Sgnpkd', lic:'CC BY-SA 4.0' },
],
'东京': [
 { f:'Sensoji_2023.jpg', h:'4/43', t:['浅草寺','Senso-ji'], by:'Akonnchiroll', lic:'CC0' },
],
'京都': [
 { f:'Kiyomizu.jpg', h:'3/3c', t:['清水寺','Kiyomizu-dera'], by:'Jordy Meow', lic:'CC BY-SA 3.0' },
 { f:'Phoenix_Hall,_Byodo-in,_November_2016_-01.jpg', h:'6/69', t:['平等院凤凰堂','the Phoenix Hall of Byodo-in'], by:'Martin Falbisoner', lic:'CC BY-SA 4.0' },
 { f:'Golden_Pavilion_Kinkaku-ji_water_mirror_2024.jpg', h:'0/0f', t:['金阁寺','Kinkaku-ji'], by:'Nacaru', lic:'CC BY-SA 4.0' },
],
'台北': [
 { f:'Bangka_Lungshan_Temple_07.23.jpg', h:'8/87', t:['艋舺龙山寺','the Longshan Temple'], by:'Supanut Arunoprayote. Feel free to use any of my images', lic:'CC BY 4.0' },
],
'香港': [
 { f:'Image-HK_LeiChengUkHanTombMuseum_Outside.jpg', h:'e/e0', t:['李郑屋汉墓','the Lei Cheng Uk Han tomb'], by:'Chong Fat', lic:'Public domain' },
],
'河内': [
 { f:'Hanoi_Temple_of_Literature_(cropped).jpg', h:'3/39', t:['文庙','the Temple of Literature'], by:'The original uploader was Chuoibk at English Wikipedia', lic:'CC BY-SA 3.0' },
 { f:'Hanoi,_Vietnam_(12041825854).jpg', h:'5/5c', t:['一柱寺','the One Pillar Pagoda'], by:'Clay Gilliland', lic:'CC BY-SA 2.0' },
],
'吴哥': [
 { f:'Angkor_Wat.jpg', h:'4/41', t:['吴哥窟','Angkor Wat'], by:'Bjørn Christian Tørrissen', lic:'CC BY-SA 4.0' },
 { f:'Bayon,_Angkor_Thom,_Camboya,_2013-08-17,_DD_37.JPG', h:'f/fa', t:['巴戎寺','the Bayon'], by:'Diego Delso', lic:'CC BY-SA 3.0' },
 { f:'Ta_Prohm_(III).jpg', h:'8/8c', t:['塔布茏寺','Ta Prohm'], by:'Supanut Arunoprayote. Feel free to use any of my images', lic:'CC BY 4.0' },
],
'曼谷': [
 { f:'Wat_Phra_Kaew_by_Ninara_TSP_edit_crop.jpg', h:'c/c1', t:['玉佛寺','Wat Phra Kaew'], by:'Original image: Ninara from Helsinki, Finland. Edit: TSP', lic:'CC BY 4.0' },
 { f:'พระพุทธไสยาสวัดพระเชตุพน.jpg', h:'5/53', t:['卧佛寺','Wat Pho'], by:'Mastertongapollo', lic:'CC BY-SA 4.0' },
],
'蒲甘': [
 { f:'Bagan,_Myanmar,_Ananda_Temple.jpg', h:'f/fd', t:['阿难陀寺','the Ananda Temple'], by:'Vyacheslav Argenberg', lic:'CC BY 4.0' },
 { f:'Shwezigon.jpg', h:'4/4f', t:['瑞喜宫塔','the Shwezigon Pagoda'], by:'DIMMIS', lic:'CC BY-SA 3.0' },
],
'仰光': [
 { f:'Shwedagon_Pagoda_2017.jpg', h:'c/c4', t:['大金塔','the Shwedagon Pagoda'], by:'Bjørn Christian Tørrissen', lic:'CC BY-SA 4.0' },
],
'马六甲': [
 { f:'St._Paul\'s_Church_Malacca_2012.JPG', h:'b/bf', t:['圣保罗教堂','St Paul\'s Church'], by:'Bjørn Christian Tørrissen', lic:'CC BY-SA 3.0' },
 { f:'Malacca_stadhuys1.jpg', h:'0/07', t:['荷兰红屋','the Stadthuys'], by:'User: (WT-shared) Slleong at wts wikivoyage', lic:'CC BY 1.0' },
],
'雅加达': [
 { f:'Batavia_City_Hall_(Jakarta_History_Museum)_Fatahillah_Square_(2025)_-_img_03.jpg', h:'5/54', t:['法塔希拉广场(旧巴达维亚)','Fatahillah Square'], by:'Chainwit', lic:'CC BY 4.0' },
],
'马尼拉': [
 { f:'San_Agustin_Church,_Intramuros,_Manila_City.jpg', h:'7/71', t:['圣奥古斯丁教堂','San Agustin Church'], by:'Johngaje92', lic:'CC BY-SA 4.0' },
 { f:'Baluartillo_de_San_José,_Manila,_Filipinas,_2023-08-26,_DD_41.jpg', h:'7/77', t:['王城区城墙','the Intramuros walls'], by:'Diego Delso', lic:'CC BY-SA 4.0' },
],
'巨港': [
 { f:'Ampera_Bridge_at_Night,_Palembang.jpg', h:'7/76', t:['安佩拉大桥','the Ampera Bridge'], by:'Gunawan Kartapranata', lic:'CC BY-SA 3.0' },
],
'新加坡': [
 { f:'Singapore_Tempel_Thian_Hock_Keng_1.jpg', h:'c/cc', t:['天福宫','Thian Hock Keng Temple'], by:'Zairon', lic:'CC BY-SA 4.0' },
 { f:'Wikimania_Singapore_2023_118.jpg', h:'8/89', t:['莱佛士酒店','Raffles Hotel'], by:'Anthere', lic:'CC BY-SA 4.0' },
 { f:'Singapore_Skyline_2019-10.jpg', h:'2/2e', t:['鱼尾狮','the Merlion'], by:'Unwicked', lic:'CC BY-SA 4.0' },
],
'吉隆坡': [
 { f:'Kuala_Lumpur_Sultan_Abdul_Building.jpg', h:'a/a4', t:['苏丹阿都沙末大厦','the Sultan Abdul Samad Building'], by:'Gerold Kogler', lic:'CC BY-SA 3.0' },
 { f:'Mosque_Jamek.jpg', h:'4/45', t:['占美清真寺','Masjid Jamek'], by:'Earth', lic:'CC BY 2.5' },
],
'胡志明市': [
 { f:'Basílica_de_Nuestra_Señora,_Ciudad_Ho_Chi_Minh,_Vietnam,_2013-08-14,_DD_03.JPG', h:'d/d7', t:['西贡圣母大教堂','Notre-Dame Cathedral of Saigon'], by:'Diego Delso', lic:'CC BY-SA 3.0' },
 { f:'Saigon_Central_Post_Office_(52681461470).jpg', h:'0/03', t:['西贡中央邮局','the Central Post Office'], by:'Kevin Rutherford', lic:'CC BY-SA 2.0' },
 { f:'20190923_Independence_Palace-10.jpg', h:'7/7d', t:['统一宫','the Reunification Palace'], by:'Balon Greyjoy', lic:'CC0' },
],
'德里': [
 { f:'Qutb_Minar_2022.jpg', h:'3/3c', t:['顾特卜塔','the Qutb Minar'], by:'Wasir kasab', lic:'CC BY 4.0' },
 { f:'Tomb_of_Humayun,_Delhi.jpg', h:'d/d2', t:['胡马雍陵','Humayun\'s Tomb'], by:'Muhammad Mahdi Karim', lic:'GFDL 1.2' },
 { f:'Delhi_fort.jpg', h:'2/2a', t:['红堡','the Red Fort'], by:'PerSona77', lic:'CC BY-SA 3.0' },
],
'孟买': [
 { f:'Elephanta_Caves_Trimurti.jpg', h:'d/d9', t:['象岛石窟','the Elephanta Caves'], by:'Christian Haugen', lic:'CC BY 2.0' },
 { f:'Chhatrapati_shivaji_terminus,_esterno_01.jpg', h:'4/4d', t:['贾特拉帕蒂·希瓦吉终点站','Chhatrapati Shivaji Terminus'], by:'Sailko', lic:'CC BY 3.0' },
 { f:'Mumbai_03-2016_30_Gateway_of_India.jpg', h:'3/3a', t:['印度门','the Gateway of India'], by:'A.Savin', lic:'FAL' },
],
'摩亨佐达罗': [
 { f:'Mohenjodaro_Sindh.jpeg', h:'9/9a', t:['大浴场','the Great Bath'], by:'The original uploader was M.Imran at English Wikipedia', lic:'CC SA 1.0', s:1 },
],
'加尔各答': [
 { f:'Victoria_Memorial_situated_in_Kolkata.jpg', h:'7/72', t:['维多利亚纪念堂','the Victoria Memorial'], by:'Subhrajyoti07', lic:'CC BY-SA 4.0' },
 { f:'Howrah_bridge_at_night.jpg', h:'c/cb', t:['豪拉大桥','the Howrah Bridge'], by:'Apoorva Karlekar', lic:'CC BY-SA 4.0' },
],
'瓦拉纳西': [
 { f:'Varanasi,_India,_Ghats,_Cremation_ceremony_in_progress.jpg', h:'0/0e', t:['瓦拉纳西','Varanasi'], by:'Vyacheslav Argenberg', lic:'CC BY 4.0' },
],
'拉合尔': [
 { f:'Badshahi_Mosque_front_picture.jpg', h:'c/c8', t:['巴德夏希清真寺','the Badshahi Mosque'], by:'Romero Maia', lic:'CC BY-SA 4.0' },
],
'科伦坡': [
 { f:'SL_Colombo_asv2020-01_img01_Wolvendaal_Church.jpg', h:'2/28', t:['沃尔文达尔教堂','the Wolvendaal Church'], by:'A.Savin', lic:'FAL' },
 { f:'Independence_Commemoration_Hall.jpg', h:'d/d7', t:['独立纪念堂','Independence Memorial Hall'], by:'Charaka Ranasinghe', lic:'CC BY 2.0' },
],
'汉皮': [
 { f:'Complex_of_Virupaksha_Temple,_Hampi_(04).jpg', h:'b/b9', t:['维鲁巴克沙神庙','the Virupaksha Temple'], by:'iMahesh', lic:'CC BY-SA 4.0' },
],
'撒马尔罕': [
 { f:'RegistanSquare_Samarkand.jpg', h:'8/8c', t:['雷吉斯坦广场','the Registan'], by:'Registan_-_Gusjer.jpg: Gustavo Jeronimo from Aranjuez, Spain', lic:'CC BY 2.0' },
 { f:'ShrineofAmirTimur.jpg', h:'5/5d', t:['古尔·埃米尔陵','the Gur-e-Amir'], by:'Willard84', lic:'CC BY-SA 4.0' },
 { f:'A_model_of_Ulug_Beg_obsrvatory_in_the_Uzbek_National_Muzeum.jpg', h:'f/f5', t:['乌鲁伯格天文台','Ulugh Beg\'s observatory'], by:'Victoria', lic:'CC BY-SA 4.0' },
],
'布哈拉': [
 { f:'UZ_Bukhara_Samanid-mausoleum.jpg', h:'5/58', t:['萨曼王陵','the Samanid Mausoleum'], by:'Apfel51', lic:'Public domain' },
 { f:'Kalyan_Minaret,_Bukhara_(Минарет_Калян_в_Бухаре,_Minorai_Kalon).jpg', h:'b/bb', t:['卡扬宣礼塔','the Kalyan Minaret'], by:'Petar Milošević', lic:'CC BY-SA 4.0' },
],
'塔什干': [
 { f:'Kukeldash_Madrasah_inner_yard.jpg', h:'3/31', t:['库克尔达什经学院','the Kukeldash Madrasah'], by:'Ymblanter', lic:'CC BY-SA 4.0' },
 { f:'Toshkent_teleminorasi.jpg', h:'5/5c', t:['塔什干电视塔','the Tashkent TV Tower'], by:'ShNajimova', lic:'CC BY 4.0' },
],
'阿拉木图': [
 { f:'Zenkov_cathedral.jpg', h:'4/4c', t:['升天大教堂','the Ascension Cathedral'], by:'Petar Milošević', lic:'CC BY-SA 4.0' },
],
'巴格达': [
 { f:'المدرسة_المستنصرية_في_بغداد.jpg', h:'7/75', t:['穆斯坦西里亚学院','the Mustansiriya Madrasa'], by:'Mustafa Waad Saeed', lic:'CC BY-SA 4.0' },
],
'大马士革': [
 { f:'Umayyad_Mosque,_Damascus.jpg', h:'d/d5', t:['倭马亚大清真寺','the Umayyad Mosque'], by:'Bernard Gagnon', lic:'CC BY-SA 3.0' },
],
'耶路撒冷': [
 { f:'Westernwall2.jpg', h:'1/17', t:['西墙','the Western Wall'], by:'Golasso', lic:'CC BY-SA 4.0' },
 { f:'Jerusalem_DomeoftheRock_J65_(cropped).JPG', h:'1/1b', t:['圆顶清真寺','the Dome of the Rock'], by:'Ludvig14', lic:'CC BY-SA 4.0' },
 { f:'Church_of_the_Holy_Sepulchre_by_Gerd_Eichmann_(cropped).jpg', h:'6/6d', t:['圣墓教堂','the Church of the Holy Sepulchre'], by:'Gerd Eichmann', lic:'CC BY-SA 4.0' },
],
'麦加': [
 { f:'The_Ka\'ba,_Great_Mosque_of_Mecca,_Saudi_Arabia_(4).jpg', h:'8/89', t:['克尔白·天房','the Kaaba'], by:'Richard Mortel', lic:'CC BY 2.0' },
],
'麦地那': [
 { f:'Quba_Mosque_Full_Picture_(2024).jpg', h:'9/98', t:['库巴清真寺','the Quba Mosque'], by:'Kaliper1', lic:'CC BY-SA 4.0' },
 { f:'Masjid_Nabawi_The_Prophet\'s_Mosque,_Madina.jpg', h:'0/0c', t:['先知清真寺','the Prophet\'s Mosque'], by:'Muhammad Mahdi Karim', lic:'GFDL 1.2' },
],
'伊斯坦布尔': [
 { f:'Hagia_Sophia_(228968325).jpeg', h:'4/4a', t:['圣索菲亚','Hagia Sophia'], by:'Adli Wahid', lic:'CC BY-SA 3.0' },
 { f:'Topkapı_-_01.jpg', h:'0/06', t:['托普卡帕宫','Topkapi Palace'], by:'Carlos Delgado', lic:'CC BY-SA 3.0' },
 { f:'SüleymaniyeMosqueIstanbul_(cropped).jpg', h:'3/38', t:['苏莱曼尼耶清真寺','the Suleymaniye Mosque'], by:'Hunanuk', lic:'CC0' },
],
'特拉布宗': [
 { f:'Sumela_From_Across_Valley.JPG', h:'d/db', t:['苏美拉修道院','Sumela Monastery'], by:'Bjørn Christian Tørrissen', lic:'CC BY-SA 3.0' },
 { f:'Hagia_Sophia_(Trabzon,_Turkey)_(27813329644).jpg', h:'5/58', t:['特拉布宗圣索菲亚教堂','Hagia Sophia of Trebizond'], by:'Sasha India', lic:'CC BY 2.0' },
],
'开罗': [
 { f:'Pyramids_of_the_Giza_Necropolis.jpg', h:'9/96', t:['吉萨金字塔','the Pyramids of Giza'], by:'KennyOMG', lic:'CC BY-SA 4.0' },
 { f:'Kairo_Ibn_Tulun_Moschee_BW_4.jpg', h:'c/ce', t:['伊本·图伦清真寺','the Mosque of Ibn Tulun'], by:'User:Berthold Werner', lic:'CC BY 3.0' },
 { f:'Flickr_-_HuTect_ShOts_-_Citadel_of_Salah_El.Din_and_Masjid_Muhammad_Ali_قلعة_صلاح_الدين_الأيوبي_ومسجد_محمد_علي_-_Cairo_-_Egypt_-_17_04_2010_(4).jpg', h:'9/93', t:['萨拉丁城堡','the Citadel of Saladin'], by:'Ahmed Al.Badawy from Cairo, Egypt', lic:'CC BY-SA 2.0' },
],
'亚历山大': [
 { f:'AlexSarapeionPompeysPillar.jpg', h:'b/be', t:['庞培柱','Pompey\'s Pillar'], by:'Roland Unger', lic:'CC BY-SA 3.0' },
 { f:'قلعة_قايتباي_من_الجو.jpg', h:'f/f1', t:['盖贝依城堡(灯塔旧址)','the Qaitbay Citadel'], by:'Hmkree', lic:'CC BY-SA 4.0' },
],
'德黑兰': [
 { f:'Palais_du_Golestan,_Téhéran_(5).jpg', h:'a/a9', t:['古列斯坦宫','the Golestan Palace'], by:'ZarlokX', lic:'CC BY-SA 4.0' },
 { f:'Azadi_Tower_(29358497718).jpg', h:'2/23', t:['自由纪念塔','the Azadi Tower'], by:'Blondinrikard Fröberg from Göteborg, Sweden', lic:'CC BY 2.0' },
],
'伊斯法罕': [
 { f:'20180301124354_IMG_4179And6more_Interior_3.jpg', h:'5/54', t:['聚礼清真寺','the Jameh Mosque'], by:'Hamidespanani', lic:'CC BY-SA 4.0' },
],
'巴比伦': [
 { f:'Ishtar_Gate.jpg', h:'e/e6', t:['伊什塔尔门遗址','the Ishtar Gate'], by:'David Stanley', lic:'CC BY-SA 3.0' },
],
'安卡拉': [
 { f:'Ataturk\'s_Mausoleum_(6225341313).jpg', h:'c/ca', t:['凯末尔陵','Anıtkabir'], by:'William Neuheisel from DC, US', lic:'CC BY 2.0' },
],
'突尼斯': [
 { f:'MYTHICAL_CARTHAGE.jpg', h:'f/f2', t:['迦太基安东尼浴场','the Antonine Baths of Carthage'], by:'R.maabid', lic:'CC BY-SA 4.0' },
 { f:'Minaret_et_patio_de_la_mosquée_Zitouna_au_centre_de_la_Médina_de_Tunis.jpg', h:'2/22', t:['宰图纳大清真寺','the Zaytuna Mosque'], by:'T A', lic:'CC BY-SA 2.0' },
],
'非斯': [
 { f:'University_of_Al_Qaraouiyine.jpg', h:'7/74', t:['卡鲁因大学','the Qarawiyyin'], by:'Abdel Hassouni', lic:'CC BY-SA 4.0' },
],
'喀布尔': [
 { f:'Garden_of_Babur_By_Dani.jpg', h:'a/a9', t:['巴布尔花园','the Gardens of Babur'], by:'Danial f4', lic:'CC BY-SA 4.0' },
 { f:'Вадим_Чуприна-Кабул_VADIM_CHUPRINA_©_Kabul_09.jpg', h:'3/3a', t:['达鲁拉曼宫','the Darul Aman Palace'], by:'ВАДИМ ЧУПРИНА', lic:'CC BY-SA 4.0' },
],
'迪拜': [
 { f:'UAE_Dubai_Al_Fahidi_Fort_img1_asv2018-01.jpg', h:'4/45', t:['法希迪堡','Al Fahidi Fort'], by:'A.Savin', lic:'FAL' },
 { f:'Burj_Khalifa_(worlds_tallest_building)_and_the_Dubai_skyline_(25781049892).jpg', h:'9/90', t:['哈利法塔','the Burj Khalifa'], by:'imran shahabuddin', lic:'CC BY 2.0' },
],
'雅典': [
 { f:'The_Parthenon_in_Athens.jpg', h:'d/da', t:['帕特农神庙','the Parthenon'], by:'Steve Swayne', lic:'CC BY 2.0' },
 { f:'Athen_Akropolis_(18512008726).jpg', h:'e/ee', t:['狄俄尼索斯剧场','the Theatre of Dionysus'], by:'dronepicr', lic:'CC BY 2.0' },
],
'罗马': [
 { f:'Pantheon_(Rome)_-_Right_side_and_front.jpg', h:'7/7b', t:['万神殿','the Pantheon'], by:'NikonZ7II', lic:'CC BY-SA 4.0' },
 { f:'Colosseo_2020.jpg', h:'d/de', t:['斗兽场','the Colosseum'], by:'FeaturedPics', lic:'CC BY-SA 4.0' },
 { f:'Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg', h:'f/f5', t:['圣彼得大教堂','St Peter\'s Basilica'], by:'Alvesgaspar', lic:'CC BY-SA 4.0' },
],
'巴黎': [
 { f:'Notre-Dame_de_Paris,_4_October_2017.jpg', h:'f/f7', t:['巴黎圣母院','Notre-Dame'], by:'Ali Sabbagh', lic:'CC0' },
 { f:'Louvre_Museum_Wikimedia_Commons.jpg', h:'6/66', t:['卢浮宫','the Louvre'], by:'Benh LIEU SONG (Flickr)', lic:'CC BY-SA 3.0' },
 { f:'Tour_Eiffel_Wikimedia_Commons_(cropped).jpg', h:'8/85', t:['埃菲尔铁塔','the Eiffel Tower'], by:'Benh LIEU SONG', lic:'Public domain' },
],
'伦敦': [
 { f:'Tower_of_London_from_the_Shard_(8515883950).jpg', h:'e/ec', t:['伦敦塔','the Tower of London'], by:'[Duncan] from Nottingham, UK', lic:'CC BY 2.0' },
 { f:'Westminster_Abbey,_Westminster.jpg', h:'4/47', t:['威斯敏斯特教堂','Westminster Abbey'], by:'Antiquary', lic:'CC BY 4.0' },
 { f:'St_Pauls_aerial_(cropped).jpg', h:'c/cb', t:['圣保罗大教堂','St Paul\'s Cathedral'], by:'Mark Fosh', lic:'CC BY 2.0' },
],
'马德里': [
 { f:'Madrid_Plaza_Mayor_(48733706273).jpg', h:'d/d2', t:['马约尔广场','the Plaza Mayor'], by:'Jorge Franganillo', lic:'CC BY 2.0' },
],
'科尔多瓦': [
 { f:'Mezquita_de_Córdoba_desde_el_aire_(Córdoba,_España).jpg', h:'6/6c', t:['大清真寺','the Mezquita'], by:'Toni Castillo Quero', lic:'CC BY-SA 2.0' },
 { f:'Puente_Romano_Cordoba.jpg', h:'0/01', t:['罗马桥','the Roman Bridge'], by:'Rafesmar', lic:'CC BY-SA 4.0' },
],
'里斯本': [
 { f:'The_Jerónimos_Monastery_or_Hieronymites_Monastery.png', h:'d/d6', t:['热罗尼莫斯修道院','the Jeronimos Monastery'], by:'Heartshade', lic:'CC BY 4.0' },
 { f:'Belém_Tower_in_Lisbon,_Portugal.jpg', h:'f/fa', t:['贝伦塔','the Belem Tower'], by:'Lisbon Photoshoots', lic:'CC BY-SA 4.0' },
],
'柏林': [
 { f:'Brandenburger_Tor_abends.jpg', h:'a/a6', t:['勃兰登堡门','the Brandenburg Gate'], by:'Thomas Wolf, www.foto-tw.de', lic:'CC BY-SA 3.0' },
],
'维也纳': [
 { f:'Wien_-_Stephansdom_(1).JPG', h:'d/dd', t:['圣斯蒂芬大教堂','St Stephen\'s Cathedral'], by:'C.Stadler/Bwag', lic:'CC BY-SA 4.0' },
 { f:'Wien_-_Schloss_Schönbrunn.JPG', h:'c/c9', t:['美泉宫','Schonbrunn Palace'], by:'C.Stadler/Bwag', lic:'CC BY-SA 4.0' },
],
'布拉格': [
 { f:'Prague_07-2016_view_from_Lesser_Town_Tower_of_Charles_Bridge_img3.jpg', h:'2/22', t:['查理大桥','the Charles Bridge'], by:'A.Savin', lic:'FAL' },
],
'华沙': [
 { f:'Royal_Castle_in_Warsaw,_Poland,_2022,_03.jpg', h:'b/bb', t:['华沙王宫','the Royal Castle'], by:'Chris Olszewski', lic:'CC BY-SA 4.0' },
 { f:'Pałac_Kultury_i_Nauki_2019.jpg', h:'b/b0', t:['文化科学宫','the Palace of Culture and Science'], by:'Adrian Grycuk', lic:'CC BY-SA 3.0 pl' },
],
'斯德哥尔摩': [
 { f:'Rhkyrkan_fr_staden.jpg', h:'5/5e', t:['骑士岛教堂','Riddarholmen Church'], by:'Alexandru Baboş Albabos', lic:'CC BY 3.0' },
],
'莫斯科': [
 { f:'Saint_Basil\'s_Cathedral_in_Moscow.jpg', h:'1/18', t:['圣瓦西里大教堂','St Basil\'s Cathedral'], by:'Tsy1980', lic:'CC BY-SA 4.0' },
 { f:'Moscow_Kremlin_from_Kamenny_bridge.jpg', h:'a/a6', t:['克里姆林宫城墙','the Kremlin walls'], by:'Минеева Ю. (Julmin) (retouched by Surendil)', lic:'CC BY-SA 1.0' },
],
'基辅': [
 { f:'80-391-0151_Kyiv_St.Sophia\'s_Cathedral_RB_18_2_(cropped).jpg', h:'6/61', t:['圣索菲亚大教堂','Saint Sophia Cathedral'], by:'Rbrechko', lic:'CC BY-SA 4.0' },
 { f:'Лавра.jpg', h:'f/fb', t:['洞窟修道院','the Kyiv Pechersk Lavra'], by:'Falin', lic:'CC BY-SA 3.0' },
],
'阿姆斯特丹': [
 { f:'Amsterdam-508-Oude_Kerk-2010-gje.jpg', h:'6/69', t:['老教堂','the Oude Kerk'], by:'Gerd Eichmann', lic:'CC BY-SA 4.0' },
 { f:'Amsterdam_(NL),_Westerkerk_--_2015_--_7186.jpg', h:'a/a0', t:['西教堂','the Westerkerk'], by:'Dietmar Rabich', lic:'CC BY-SA 4.0' },
 { f:'Palacio_Real,_Ámsterdam,_Países_Bajos,_2016-05-30,_DD_07-09_HDR.jpg', h:'5/5c', t:['王宫(原市政厅)','the Royal Palace (old town hall)'], by:'Diego Delso', lic:'CC BY-SA 4.0' },
],
'威尼斯': [
 { f:'Venezia_Basilica_di_San_Marco_Fassade_2.jpg', h:'6/61', t:['圣马可大教堂','St Mark\'s Basilica'], by:'Zairon', lic:'Public domain' },
 { f:'(Venice)_Doge\'s_Palace_and_campanile_of_St._Mark\'s_Basilica_facing_the_sea.jpg', h:'0/00', t:['总督宫','the Doge\'s Palace'], by:'Didier Descouens', lic:'CC BY-SA 4.0' },
],
'佛罗伦萨': [
 { f:'Cattedrale_di_Santa_Maria_del_Fiore_–_Il_Duomo_di_Firenze.jpg', h:'c/c7', t:['圣母百花大教堂穹顶','Brunelleschi\'s dome'], by:'Gary Campbell-Hall', lic:'CC BY 2.0' },
 { f:'Ponte_Vecchio_from_Ponte_alle_Grazie.jpg', h:'7/7d', t:['老桥','the Ponte Vecchio'], by:'Ingo Mehling', lic:'CC BY-SA 4.0' },
],
'米兰': [
 { f:'San_Ambrosio_00.jpg', h:'e/e9', t:['圣安布罗焦教堂','the Basilica of Sant\'Ambrogio'], by:'Novellón', lic:'CC BY-SA 4.0' },
 { f:'Milan_Cathedral_from_Piazza_del_Duomo.jpg', h:'7/70', t:['米兰大教堂','the Duomo'], by:'Jiuguang Wang', lic:'CC BY-SA 3.0' },
 { f:'The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg', h:'4/48', t:['《最后的晚餐》壁画','The Last Supper mural'], by:'Leonardo da Vinci', lic:'Public domain' },
],
'巴塞罗那': [
 { f:'SF_maig_2_cropped.jpg', h:'e/ef', t:['圣家堂','the Sagrada Família'], by:'Canaan', lic:'CC BY-SA 4.0' },
 { f:'Casa_Milà,_general_view.jpg', h:'d/de', t:['米拉之家','Casa Milà'], by:'Thomas Ledl', lic:'CC BY-SA 4.0' },
],
'廷巴克图': [
 { f:'2007_Sankore_Mosque_Timbuktu_02.jpg', h:'1/1d', t:['桑科雷清真寺','the Sankore Mosque'], by:'Anne and David', lic:'Public domain' },
],
'加奥': [
 { f:'Askia.jpg', h:'a/ab', t:['阿斯基亚陵','the Tomb of Askia'], by:'Taguelmoust', lic:'CC BY-SA 3.0', s:1 },
],
'卡诺': [
 { f:'Dala_Hills_(Dutse_Dala).jpg', h:'a/a8', t:['卡诺古城墙','the Kano city walls'], by:'Ummigarba', lic:'CC BY-SA 4.0' },
],
'金沙萨': [
 { f:'La_Gombe,_Kinshasa,_RDC_(cropped).jpg', h:'1/18', t:['金沙萨','Kinshasa'], by:'Francis Shok Mweze', lic:'CC BY-SA 4.0' },
],
'阿克苏姆': [
 { f:'Rome_Stele.jpg', h:'6/69', t:['阿克苏姆方尖碑','the Aksum obelisks'], by:'Ondřej Žváček', lic:'CC BY 2.5' },
],
'亚的斯亚贝巴': [
 { f:'Katedrála_sv._Jiří.jpg', h:'b/b7', t:['圣乔治大教堂','St George\'s Cathedral'], by:'Ondřej Žváček', lic:'CC BY 2.5' },
 { f:'Addis_Ababa_Ethiopia_2.jpg', h:'2/2d', t:['三一大教堂','Holy Trinity Cathedral'], by:'Gize12', lic:'CC BY-SA 4.0', s:1 },
 { f:'African_Union_Conference_Centre_building.jpg', h:'8/84', t:['非洲联盟会议中心','the African Union headquarters'], by:'Andrew Moore', lic:'CC BY-SA 2.0' },
],
'大津巴布韦': [
 { f:'Conical_Tower_-_Great_Enclosure_III_(33736918448).jpg', h:'d/d4', t:['大围场','the Great Enclosure'], by:'Andrew Moore from Johannesburg, South Africa', lic:'CC BY-SA 2.0' },
],
'蒙巴萨': [
 { f:'Fort_Jesus_at_the_Mombasa_Island.jpg', h:'4/41', t:['耶稣堡','Fort Jesus'], by:'Maingi030', lic:'CC BY-SA 4.0', s:1 },
],
'基尔瓦': [
 { f:'Ruins_of_Kilwa_Kisiwani_and_Ruins_of_Songo_Mnara-108279.jpg', h:'f/f8', t:['大清真寺','the Great Mosque'], by:'Ron Van Oers', lic:'CC BY-SA 3.0 igo' },
],
'拉各斯': [
 { f:'National_Theatre_Nigeria.jpg', h:'e/e9', t:['尼日利亚国家剧院','the National Theatre'], by:'Godiva Omoruyi', lic:'CC BY-SA 4.0' },
],
'开普敦': [
 { f:'Castle_of_Good_Hope,_Cape_Town_01.jpg', h:'a/ae', t:['好望角城堡','the Castle of Good Hope'], by:'Bernard Gagnon', lic:'CC BY-SA 4.0' },
],
'麦罗埃': [
 { f:'Sudan_Meroe_Pyramids_2001.JPG', h:'5/53', t:['麦罗埃金字塔群','the Nubian pyramids'], by:'Photographer: B N Chagny', lic:'CC BY-SA 1.0', s:1 },
],
'内罗毕': [
 { f:'Karen_Blixen_House_and_Museum,_Nairobi,_KE.jpg', h:'8/8f', t:['卡伦·布里克森故居','the Karen Blixen house'], by:'Daniel Case', lic:'CC BY-SA 4.0' },
 { f:'KICC_nairobi_kenya.jpg', h:'c/c5', t:['肯雅塔国际会议中心','the Kenyatta International Convention Centre'], by:'Original uploader was Mkimemia at en.wikipedia', lic:'CC BY-SA 3.0', s:1 },
],
'约翰内斯堡': [
 { f:'Johannesburg_skyline_2017.jpg', h:'9/95', t:['约翰内斯堡','Johannesburg'], by:'Mark Hillary', lic:'CC BY 2.0' },
],
'墨西哥城': [
 { f:'Catedral_y_Sagrario_Metropolitano_33.jpg', h:'0/0c', t:['大教堂','the Metropolitan Cathedral'], by:'Ulisesmorales', lic:'CC BY-SA 3.0' },
],
'特奥蒂瓦坎': [
 { f:'2020-02-11_Teotihuacan_la_Avenida_de_los_Muertos_y_la_Pirámide_del_Sol.jpg', h:'3/3b', t:['太阳金字塔','the Pyramid of the Sun'], by:'Burkhard Mücke', lic:'CC BY-SA 4.0' },
],
'奇琴伊察': [
 { f:'Chichen_Itza_3.jpg', h:'5/51', t:['库库尔坎金字塔','El Castillo'], by:'Daniel Schwen', lic:'CC BY-SA 4.0' },
],
'蒂卡尔': [
 { f:'Tikal_Temple1_2006_08_11.JPG', h:'0/06', t:['一号神庙','Temple I'], by:'Raymond Ostertag', lic:'CC BY-SA 2.5' },
],
'库斯科': [
 { f:'Sacsayhuamán,_Cusco,_Perú,_2015-07-31,_DD_27.JPG', h:'6/60', t:['萨克塞华曼','Sacsayhuaman'], by:'Diego Delso', lic:'CC BY-SA 4.0' },
],
'利马': [
 { f:'Lima_convento_san_francisco_de_asis.jpg', h:'a/af', t:['圣弗朗西斯科修道院','the Monastery of San Francisco'], by:'Velvet', lic:'CC BY-SA 4.0' },
],
'波哥大': [
 { f:'2017_Bogotá_Basílica_del_Señor_Caído_de_Monserrate.jpg', h:'8/8f', t:['蒙塞拉特山圣殿','the Monserrate sanctuary'], by:'Felipe Restrepo Acosta', lic:'CC BY-SA 4.0' },
],
'布宜诺斯艾利斯': [
 { f:'Cabildo_de_Buenos_Aires_2023.jpg', h:'8/88', t:['卡比尔多市政厅','the Cabildo'], by:'Fernando', lic:'CC BY-SA 4.0' },
 { f:'Fachada_del_Teatro_Colón_en_Buenos_Aires,_Argentina.jpg', h:'8/82', t:['科隆剧院','the Teatro Colón'], by:'EEJCC', lic:'CC0' },
 { f:'Buenos_Aires_(20234294752).jpg', h:'f/fc', t:['方尖碑','the Obelisk'], by:'Rodrigo Paredes from Ciudad Autónoma de Buenos Aires, Argent', lic:'CC BY 2.0' },
],
'里约热内卢': [
 { f:'Mosteiro_de_São_Bento_01.jpg', h:'1/14', t:['圣本笃修道院','the São Bento Monastery'], by:'Klayton Aurélio de Oliveira', lic:'CC BY-SA 4.0' },
 { f:'At_Rio_de_Janeiro_2019_129.jpg', h:'e/e9', t:['卡里奥卡渡槽(拉帕拱桥)','the Carioca Aqueduct (Lapa Arches)'], by:'Mike Peel (www.mikepeel.net)', lic:'CC BY-SA 4.0' },
 { f:'Christ_the_Redeemer_-_Cristo_Redentor.jpg', h:'4/4f', t:['救世基督像','Christ the Redeemer'], by:'Arne Müseler', lic:'CC BY-SA 3.0 de' },
],
'圣地亚哥': [
 { f:'2017_Santiago_de_Chile_-_Catedral_de_Santiago.jpg', h:'1/1a', t:['圣地亚哥大教堂','the Metropolitan Cathedral'], by:'Felipe Restrepo Acosta', lic:'CC BY-SA 4.0' },
 { f:'Palacio_de_La_Moneda_-_miguelreflex.jpg', h:'2/21', t:['莫内达宫','La Moneda'], by:'Miguel hernandez', lic:'CC BY-SA 2.0' },
],
'纽约': [
 { f:'Front_view_of_Statue_of_Liberty_(cropped).jpg', h:'8/89', t:['自由女神像','the Statue of Liberty'], by:'AskALotl', lic:'CC0' },
 { f:'Brooklyn_Bridge_and_the_Lower_Manhattan_skyline_from_Pebble_Beach,_New_York.jpg', h:'f/f0', t:['布鲁克林大桥','the Brooklyn Bridge'], by:'Christian David', lic:'CC BY-SA 4.0' },
],
'洛杉矶': [
 { f:'Hollywood_sign_(8485145044).jpg', h:'2/2f', t:['好莱坞标志','the Hollywood Sign'], by:'Gnaphron', lic:'CC BY-SA 2.0' },
 { f:'Griffith_observatory_2006.jpg', h:'4/4b', t:['格里菲斯天文台','Griffith Observatory'], by:'Matthew Field', lic:'CC BY 2.5' },
],
'哈瓦那': [
 { f:'DJI_0197_crp_wiki.jpg', h:'1/12', t:['哈瓦那','Havana'], by:'RenaatPeeters', lic:'CC BY-SA 4.0' },
],
'卡霍基亚': [
 { f:'Monks_Mound_in_July.JPG', h:'2/2d', t:['僧侣丘','Monks Mound'], by:'Skubasteve834', lic:'CC BY-SA 3.0' },
],
'旧金山': [
 { f:'Mission_Dolores_(1165072805).jpg', h:'6/69', t:['多洛雷斯传教所','Mission Dolores'], by:'David Ohmer from Cincinnati, USA', lic:'CC BY 2.0', s:1 },
 { f:'Alcatraz_Island_photo_Don_Ramey_Logan.jpg', h:'f/f3', t:['恶魔岛监狱','the Alcatraz cellhouse'], by:'Don Ramey Logan', lic:'CC BY-SA 3.0' },
 { f:'Golden_Gate_Bridge_as_seen_from_Battery_East.jpg', h:'b/bf', t:['金门大桥','the Golden Gate Bridge'], by:'Frank Schulenburg', lic:'CC BY-SA 4.0' },
],
'芝加哥': [
 { f:'The_Chicago_Water_Tower.jpg', h:'8/86', t:['芝加哥水塔','the Chicago Water Tower'], by:'Bernt Rostad', lic:'CC BY 2.0' },
 { f:'Frederick_C._Robie_House.JPG', h:'1/19', t:['罗比之家','the Robie House'], by:'Teemu08', lic:'CC BY-SA 3.0' },
 { f:'Sears_Tower,_Wacker_Drive_and_Jackson_Boulevard,_Chicago,_IL_-_54189600901.jpg', h:'7/7d', t:['威利斯大厦(原西尔斯大厦)','the Willis (Sears) Tower'], by:'w_lemay', lic:'CC BY-SA 2.0' },
],
'西雅图': [
 { f:'Pike_Place_Market_Seattle.jpg', h:'6/6a', t:['派克市场','Pike Place Market'], by:'Daniel Schwen', lic:'CC BY-SA 4.0' },
 { f:'Space_Needle_2011-07-04.jpg', h:'2/23', t:['太空针塔','the Space Needle'], by:'Jordon Kalilich', lic:'Public domain' },
],
'华盛顿': [
 { f:'Capitol_Building_Full_View.jpg', h:'2/27', t:['国会大厦','the Capitol'], by:'Noclip', lic:'Public domain' },
],
'波士顿': [
 { f:'Faneuil_Hall_(5813514354).jpg', h:'c/c7', t:['法尼尔厅','Faneuil Hall'], by:'Eric Kilby from Somerville, MA, USA', lic:'CC BY-SA 2.0' },
],
'迈阿密': [
 { f:'Villa_Vizcaya_20110228.jpg', h:'2/25', t:['维兹卡亚庄园','the Vizcaya villa'], by:'Averette', lic:'CC BY 3.0' },
 { f:'Freedom_Tower_Downtown_Miami_(38075844515).jpg', h:'3/3e', t:['自由塔','the Freedom Tower'], by:'Phillip Pessar from Miami, USA', lic:'CC BY 2.0' },
],
'多伦多': [
 { f:'Torontos_Old_City_Hall_2009.jpg', h:'8/8e', t:['老市政厅','the Old City Hall'], by:'Richard Kang from Canada', lic:'CC BY 2.0' },
 { f:'Exterior_of_Casa_Loma,_June_2012.jpg', h:'4/43', t:['卡萨罗马城堡','Casa Loma'], by:'Priscilla Jordão from São Paulo, Brasil', lic:'CC BY-SA 2.0' },
],
'蒙特利尔': [
 { f:'Basílica_de_Notre-Dame,_Montreal,_Canadá,_2017-08-11,_DD_26-28_HDR.jpg', h:'7/7b', t:['圣母大教堂','Notre-Dame Basilica'], by:'Diego Delso', lic:'CC BY-SA 4.0' },
],
'温哥华': [
 { f:'MNP_Tower_2015.jpg', h:'8/8b', t:['海洋大厦','the Marine Building'], by:'Klazu', lic:'CC BY-SA 4.0', s:1 },
 { f:'Lion\'s_Gate_Bridge_and_North_Vancouver.jpg', h:'4/42', t:['狮门大桥','the Lions Gate Bridge'], by:'Steve Voght from Seattle, WA, USA', lic:'CC BY-SA 2.0' },
],
'悉尼': [
 { f:'HydeParkBarracks.JPG', h:'0/02', t:['海德公园兵营','the Hyde Park Barracks'], by:'The original uploader was J Bar at English Wikipedia', lic:'CC BY-SA 3.0' },
 { f:'Sydney_Australia._(21339175489).jpg', h:'a/a0', t:['悉尼歌剧院','the Sydney Opera House'], by:'Bernard Spragg. NZ from Christchurch, New Zealand', lic:'CC0' },
],
'墨尔本': [
 { f:'Royal_exhibition_building_tulips_straight.jpg', h:'4/43', t:['皇家展览馆','the Royal Exhibition Building'], by:'Photograph taken by Diliff and straightened by Ian Fieggen', lic:'CC BY 2.5' },
 { f:'Flinders_Station_and_trams.jpg', h:'9/99', t:['弗林德斯街车站','Flinders Street Station'], by:'Created by Philip Mallis in 2021; cropped by HappyWaldo', lic:'CC BY-SA 3.0' },
],
'奥克兰': [
 { f:'One_Tree_Hill,_Auckland,_March_2015.jpg', h:'8/88', t:['一树山毛利要塞遗迹','the Maungakiekie pa terraces'], by:'Techno246', lic:'CC BY-SA 3.0' },
],
};
