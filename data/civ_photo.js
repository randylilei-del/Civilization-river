/* ---------- 文明照片(v204,Ray 拍板:先城市后文明,不用 AI 图、不用人像) ----------
   键 = CIVS.n,值 = 最多三张 { f:Commons 文件名, h:'x/xy' md5 路径前缀, t:[中英图注], by:作者, lic:许可, s?:1 原图不足 960px 直接取原图 }。
   渲染在文明卡「速览」四格之下、六问之前:一个「📷 看照片」按钮,点了才插 <img>——与 VIDEO / CITY_PHOTO 同一口径,不点零请求。
   图来源两路(v204):
   ① 复用城市古迹表(CITY_SITES)+ 城市照片表(CITY_PHOTO):古迹的「朝代」字段映射到文明名(映射表 tools/civ_photo_dynasty_map.json;手工点名的条目清单 tools/civ_photo_curated_titles.json),
      年份与图都已过 v201/v202 两轮核查——唐→大雁塔、明→紫禁城、奥斯曼→托普卡帕宫。这一路 76 条文明。
   ② 剩下的文明手工点名「拍得到的实物」(成就字段里的东西:乌尔塔庙、汉谟拉比法典、桑奇大塔、摩艾……),取英文维基条目首图,
      Commons 查许可,缩略图人眼过一遍(剔地图 / 黑白远景 / 糊图 10 张)。抽象成就(科举、法典条文)不配图;不配人像。
   覆盖不到的文明留空(v342 第三批补 20 条后,留空=v209 的 11 条+喀布尔沙希——维基条目无首图,Commons 搜索也没有可用实物照;v209 时点 11 条:匈奴、柔然、匈人、嚈哒、准噶尔、俄国治下中亚、西晋、渤海国、卡涅姆·博尔努、加纳帝国、拉皮塔——
   要么真没有拿得出手的实物,要么维基条目首图是地图),没条目就不渲染按钮,不硬凑。第二批手工清单见 tools/civ_photo_curated_titles2.json。
   ⚠ 缩略图宽度只能用 960(Commons 对站外只出标准档),同 city_photo.js。 */
const CIV_PHOTO = {
'米诺斯·迈锡尼': [
 { f:'Lion_Gate_-_Mycenae_by_Joy_of_Museums.jpg', h:'3/37', t:['迈锡尼狮子门','the Lion Gate of Mycenae'], by:'Joyofmuseums', lic:'CC BY-SA 4.0' },
],
'古希腊': [
 { f:'The_Parthenon_in_Athens.jpg', h:'d/da', t:['帕特农神庙','the Parthenon'], by:'Steve Swayne', lic:'CC BY 2.0' },
 { f:'Athen_Akropolis_(18512008726).jpg', h:'e/ee', t:['狄俄尼索斯剧场','the Theatre of Dionysus'], by:'dronepicr', lic:'CC BY 2.0' },
],
'罗马共和国': [
 { f:'Foro_Romano_Musei_Capitolini_Roma.jpg', h:'6/6a', t:['古罗马广场','the Roman Forum'], by:'This Photo was taken by Wolfgang Moroder. Feel free to use m', lic:'CC BY-SA 3.0' },
 { f:'Paesaggio_dell\'Appia_antica.jpg', h:'3/3d', t:['阿庇亚大道','the Appian Way'], by:'LuisaV72', lic:'CC BY-SA 4.0' },
],
'罗马帝国': [
 { f:'Puente_Romano_Cordoba.jpg', h:'0/01', t:['罗马桥','the Roman Bridge'], by:'Rafesmar', lic:'CC BY-SA 4.0' },
 { f:'Colosseo_2020.jpg', h:'d/de', t:['斗兽场','the Colosseum'], by:'FeaturedPics', lic:'CC BY-SA 4.0' },
 { f:'Pantheon_(Rome)_-_Right_side_and_front.jpg', h:'7/7b', t:['万神殿','the Pantheon'], by:'NikonZ7II', lic:'CC BY-SA 4.0' },
],
'拜占庭': [
 { f:'Hagia_Sophia_(228968325).jpeg', h:'4/4a', t:['圣索菲亚','Hagia Sophia'], by:'Adli Wahid', lic:'CC BY-SA 3.0' },
 { f:'Sumela_From_Across_Valley.JPG', h:'d/db', t:['苏美拉修道院','Sumela Monastery'], by:'Bjørn Christian Tørrissen', lic:'CC BY-SA 3.0' },
 { f:'Hagia_Sophia_(Trabzon,_Turkey)_(27813329644).jpg', h:'5/58', t:['特拉布宗圣索菲亚教堂','Hagia Sophia of Trebizond'], by:'Sasha India', lic:'CC BY 2.0' },
],
'中世纪西欧': [
 { f:'Tower_of_London_from_the_Shard_(8515883950).jpg', h:'e/ec', t:['伦敦塔','the Tower of London'], by:'[Duncan] from Nottingham, UK', lic:'CC BY 2.0' },
 { f:'San_Ambrosio_00.jpg', h:'e/e9', t:['圣安布罗焦教堂','the Basilica of Sant\'Ambrogio'], by:'Novellón', lic:'CC BY-SA 4.0' },
 { f:'Wien_-_Stephansdom_(1).JPG', h:'d/dd', t:['圣斯蒂芬大教堂','St Stephen\'s Cathedral'], by:'C.Stadler/Bwag', lic:'CC BY-SA 4.0' },
],
'后倭马亚·安达卢斯': [
 { f:'Mezquita_de_Córdoba_desde_el_aire_(Córdoba,_España).jpg', h:'6/6c', t:['大清真寺','the Mezquita'], by:'Toni Castillo Quero', lic:'CC BY-SA 2.0' },
],
'文艺复兴意大利': [
 { f:'Venezia_Basilica_di_San_Marco_Fassade_2.jpg', h:'6/61', t:['圣马可大教堂','St Mark\'s Basilica'], by:'Zairon', lic:'Public domain' },
 { f:'Milan_Cathedral_from_Piazza_del_Duomo.jpg', h:'7/70', t:['米兰大教堂','the Duomo'], by:'Jiuguang Wang', lic:'CC BY-SA 3.0' },
 { f:'(Venice)_Doge\'s_Palace_and_campanile_of_St._Mark\'s_Basilica_facing_the_sea.jpg', h:'0/00', t:['总督宫','the Doge\'s Palace'], by:'Didier Descouens', lic:'CC BY-SA 4.0' },
],
'波兰-立陶宛': [
 { f:'Royal_Castle_in_Warsaw,_Poland,_2022,_03.jpg', h:'b/bb', t:['华沙王宫','the Royal Castle'], by:'Chris Olszewski', lic:'CC BY-SA 4.0' },
 { f:'Wawel_(4).jpg', h:'8/87', t:['瓦维尔城堡','Wawel Castle'], by:'Monika Towiańska', lic:'CC BY-SA 4.0' },
],
'西班牙·葡萄牙帝国': [
 { f:'Belém_Tower_in_Lisbon,_Portugal.jpg', h:'f/fa', t:['贝伦塔','the Belem Tower'], by:'Lisbon Photoshoots', lic:'CC BY-SA 4.0' },
 { f:'The_Jerónimos_Monastery_or_Hieronymites_Monastery.png', h:'d/d6', t:['热罗尼莫斯修道院','the Jeronimos Monastery'], by:'Heartshade', lic:'CC BY 4.0' },
 { f:'Madrid_Plaza_Mayor_(48733706273).jpg', h:'d/d2', t:['马约尔广场','the Plaza Mayor'], by:'Jorge Franganillo', lic:'CC BY 2.0' },
],
'奥地利·哈布斯堡': [
 { f:'Wien_-_Schloss_Schönbrunn.JPG', h:'c/c9', t:['美泉宫','Schonbrunn Palace'], by:'C.Stadler/Bwag', lic:'CC BY-SA 4.0' },
 { f:'Wien_-_Neue_Hofburg.JPG', h:'3/31', t:['霍夫堡宫','the Hofburg'], by:'C.Stadler/Bwag', lic:'CC BY-SA 3.0 at' },
],
'荷兰共和国': [
 { f:'Amsterdam_(NL),_Westerkerk_--_2015_--_7186.jpg', h:'a/a0', t:['西教堂','the Westerkerk'], by:'Dietmar Rabich', lic:'CC BY-SA 4.0' },
 { f:'Palacio_Real,_Ámsterdam,_Países_Bajos,_2016-05-30,_DD_07-09_HDR.jpg', h:'5/5c', t:['王宫(原市政厅)','the Royal Palace (old town hall)'], by:'Diego Delso', lic:'CC BY-SA 4.0' },
],
'法兰西': [
 { f:'Tour_Eiffel_Wikimedia_Commons_(cropped).jpg', h:'8/85', t:['埃菲尔铁塔','the Eiffel Tower'], by:'Benh LIEU SONG', lic:'Public domain' },
 { f:'Vue_aérienne_du_domaine_de_Versailles_par_ToucanWings_-_Creative_Commons_By_Sa_3.0_-_081_(cropped).jpg', h:'9/95', t:['凡尔赛宫','the Palace of Versailles'], by:'ToucanWings', lic:'CC BY-SA 3.0' },
 { f:'Arc_de_Triomphe,_Paris_21_October_2010.jpg', h:'7/79', t:['凯旋门','the Arc de Triomphe'], by:'Jiuguang Wang', lic:'CC BY-SA 2.0' },
],
'瑞典帝国': [
 { f:'The_Vasa_from_the_Bow.jpg', h:'1/15', t:['瓦萨号战舰','the warship Vasa'], by:'JavierKohen', lic:'CC BY-SA 3.0' },
 { f:'The_Royal_Palace_(15891592359).jpg', h:'3/30', t:['斯德哥尔摩王宫','Stockholm Palace'], by:'Magnus Johansson', lic:'CC BY-SA 2.0' },
],
'大英帝国·英国': [
 { f:'St_Pauls_aerial_(cropped).jpg', h:'c/cb', t:['圣保罗大教堂','St Paul\'s Cathedral'], by:'Mark Fosh', lic:'CC BY 2.0' },
 { f:'Faneuil_Hall_(5813514354).jpg', h:'c/c7', t:['法尼尔厅','Faneuil Hall'], by:'Eric Kilby from Somerville, MA, USA', lic:'CC BY-SA 2.0' },
 { f:'Basílica_de_Notre-Dame,_Montreal,_Canadá,_2017-08-11,_DD_26-28_HDR.jpg', h:'7/7b', t:['圣母大教堂','Notre-Dame Basilica'], by:'Diego Delso', lic:'CC BY-SA 4.0' },
],
'德意志': [
 { f:'Brandenburger_Tor_abends.jpg', h:'a/a6', t:['勃兰登堡门','the Brandenburg Gate'], by:'Thomas Wolf, www.foto-tw.de', lic:'CC BY-SA 3.0' },
 { f:'Kölner_Dom_-_Westfassade_2022_ohne_Gerüst-0968_b.jpg', h:'0/04', t:['科隆大教堂','Cologne Cathedral'], by:'Raimond Spekking', lic:'CC BY-SA 4.0' },
 { f:'Schloss_Neuschwanstein_2013.jpg', h:'f/f8', t:['新天鹅堡','Neuschwanstein Castle'], by:'Thomas Wolf, www.foto-tw.de', lic:'CC BY-SA 3.0 de' },
],
'俄罗斯·苏联': [
 { f:'Moscow_Kremlin_from_Kamenny_bridge.jpg', h:'a/a6', t:['克里姆林宫城墙','the Kremlin walls'], by:'Минеева Ю. (Julmin) (retouched by Surendil)', lic:'CC BY-SA 1.0' },
 { f:'Saint_Basil\'s_Cathedral_in_Moscow.jpg', h:'1/18', t:['圣瓦西里大教堂','St Basil\'s Cathedral'], by:'Tsy1980', lic:'CC BY-SA 4.0' },
 { f:'Zenkov_cathedral.jpg', h:'4/4c', t:['升天大教堂','the Ascension Cathedral'], by:'Petar Milošević', lic:'CC BY-SA 4.0' },
],
'苏美尔·阿卡德': [
 { f:'Ziggarat_of_Ur_001.jpg', h:'6/6b', t:['乌尔塔庙','the Ziggurat of Ur'], by:'Tla2006 at English Wikipedia', lic:'Public domain' },
 { f:'Denis_Bourez_-_British_Museum,_London_(8747049029)_(2).jpg', h:'3/38', t:['乌尔军旗','the Standard of Ur'], by:'Denis Bourez from France', lic:'CC BY 2.0' },
],
'古埃及': [
 { f:'Pyramids_of_the_Giza_Necropolis.jpg', h:'9/96', t:['吉萨金字塔','the Pyramids of Giza'], by:'KennyOMG', lic:'CC BY-SA 4.0' },
 { f:'Sphinx_with_the_third_pyramid.jpg', h:'4/42', t:['狮身人面像','the Great Sphinx'], by:'Hesham Ebaid', lic:'CC0' },
 { f:'CairoEgMuseumTaaMaskMostlyPhotographed.jpg', h:'2/27', t:['图坦卡蒙金面具','the mask of Tutankhamun'], by:'Roland Unger', lic:'Public domain' },
],
'赫梯': [
 { f:'Lion_Gate,_Hattusa_13_(cropped).jpg', h:'1/14', t:['哈图沙狮子门','the Lion Gate at Hattusa'], by:'Carole Raddato from FRANKFURT, Germany', lic:'CC BY-SA 2.0' },
 { f:'Yazilikaya_Kammer_A.jpg', h:'5/58', t:['亚兹勒卡亚岩刻','Yazılıkaya'], by:'Klaus-Peter Simon', lic:'CC BY 3.0' },
],
'古巴比伦': [
 { f:'F0182_Louvre_Code_Hammourabi_Bas-relief_Sb8_rwk.jpg', h:'9/98', t:['汉谟拉比像','Hammurabi'], by:'Mbzt', lic:'CC BY 3.0' },
 { f:'Berlín,_Museo_de_Pérgamo_05.jpg', h:'1/1f', t:['伊什塔尔门(柏林复原)','the Ishtar Gate (reconstructed in Berlin)'], by:'LBM1948', lic:'CC BY-SA 4.0' },
],
'亚述': [
 { f:'Iraqi_Museum.jpg', h:'0/02', t:['人首翼牛像','a lamassu'], by:'MohammadHuzam', lic:'CC BY-SA 4.0' },
 { f:'Exhibition_I_am_Ashurbanipal_king_of_the_world,_king_of_Assyria,_British_Museum_(45972455081).jpg', h:'0/0e', t:['亚述巴尼拔猎狮浮雕','the Lion Hunt of Ashurbanipal'], by:'Carole Raddato from FRANKFURT, Germany', lic:'CC BY-SA 2.0' },
],
'腓尼基': [
 { f:'Byblos_Libanon_2003.JPG', h:'3/3c', t:['比布鲁斯遗址','Byblos'], by:'Orient at de.wikipedia', lic:'CC BY-SA 2.0 de' },
],
'新巴比伦': [
 { f:'Ishtar_Gate.jpg', h:'e/e6', t:['伊什塔尔门遗址','the Ishtar Gate'], by:'David Stanley', lic:'CC BY-SA 3.0' },
 { f:'Berlín,_Museo_de_Pérgamo_05.jpg', h:'1/1f', t:['伊什塔尔门(柏林复原)','the Ishtar Gate (reconstructed in Berlin)'], by:'LBM1948', lic:'CC BY-SA 4.0' },
],
'迦太基': [
 { f:'Maison_punique_byrsa.jpg', h:'f/f5', t:['迦太基比尔萨山遗址','Byrsa hill, Carthage'], by:'Pradigue', lic:'CC BY-SA 3.0' },
 { f:'Montage_ville_de_Carthage.png', h:'3/34', t:['迦太基遗址','the ruins of Carthage'], by:'ELEL09, montage', lic:'CC BY-SA 3.0' },
],
'波斯(阿契美尼德)': [
 { f:'Cyrus_Cylinder_front.jpg', h:'e/e5', t:['居鲁士圆柱','the Cyrus Cylinder'], by:'Prioryman', lic:'CC BY-SA 3.0' },
 { f:'Persepolis_Gate_of_All_Nations_(cropped).jpg', h:'9/94', t:['波斯波利斯万国门','the Gate of All Nations at Persepolis'], by:'Shahrokhphoto', lic:'CC BY-SA 4.0' },
 { f:'Persepolis001.jpg', h:'2/29', t:['波斯波利斯阿帕达纳宫','the Apadana at Persepolis'], by:'', lic:'CC BY-SA 2.5' },
],
'希腊化王朝': [
 { f:'Pergamon_Museum_in_Berlin.jpg', h:'7/72', t:['帕加马祭坛','the Pergamon Altar'], by:'SALTOnline', lic:'No restrictions' },
 { f:'Ephesus_Celsus_Library_Façade.jpg', h:'8/84', t:['以弗所塞尔苏斯图书馆','the Library of Celsus'], by:'Benh LIEU SONG', lic:'CC BY-SA 3.0' },
],
'罗马治下近东': [
 { f:'Westernwall2.jpg', h:'1/17', t:['西墙','the Western Wall'], by:'Golasso', lic:'CC BY-SA 4.0' },
],
'帕提亚·萨珊': [
 { f:'001125-TaqKasra-Iraq-IMG_7914-2.jpg', h:'c/c4', t:['泰西封拱门','Taq Kasra'], by:'Safa.daneshvar', lic:'CC BY-SA 4.0' },
 { f:'Naqsh-e_Rustam_necropolis_in_Iran.jpg', h:'4/41', t:['纳克什鲁斯塔姆岩刻','Naqsh-e Rostam'], by:'Maasaak', lic:'CC BY-SA 4.0' },
],
'法蒂玛王朝': [
 { f:'Mosquée_Al-Azhar.jpg', h:'4/47', t:['爱资哈尔清真寺','al-Azhar Mosque'], by:'Wildoo78', lic:'CC BY-SA 4.0' },
 { f:'Cairo,_porte_settentrionali,_01.JPG', h:'2/21', t:['开罗征服门','Bab al-Futuh, Cairo'], by:'Sailko', lic:'CC BY 3.0' },
],
'阿拉伯哈里发': [
 { f:'Quba_Mosque_Full_Picture_(2024).jpg', h:'9/98', t:['库巴清真寺','the Quba Mosque'], by:'Kaliper1', lic:'CC BY-SA 4.0' },
 { f:'Masjid_Nabawi_The_Prophet\'s_Mosque,_Madina.jpg', h:'0/0c', t:['先知清真寺','the Prophet\'s Mosque'], by:'Muhammad Mahdi Karim', lic:'GFDL 1.2' },
 { f:'Jerusalem_DomeoftheRock_J65_(cropped).JPG', h:'1/1b', t:['圆顶清真寺','the Dome of the Rock'], by:'Ludvig14', lic:'CC BY-SA 4.0' },
],
'塞尔柱突厥': [
 { f:'Sultan_Hanı_Kervansaray;_Nordseite.jpg', h:'e/ef', t:['苏丹哈尼商队驿站','the Sultan Han caravanserai'], by:'Christian1311', lic:'CC BY-SA 4.0' },
 { f:'20180301124354_IMG_4179And6more_Interior_3.jpg', h:'5/54', t:['伊斯法罕聚礼清真寺','the Jameh Mosque of Isfahan'], by:'Hamidespanani', lic:'CC BY-SA 4.0' },
],
'阿尤布王朝': [
 { f:'Flickr_-_HuTect_ShOts_-_Citadel_of_Salah_El.Din_and_Masjid_Muhammad_Ali_قلعة_صلاح_الدين_الأيوبي_ومسجد_محمد_علي_-_Cairo_-_Egypt_-_17_04_2010_(4).jpg', h:'9/93', t:['萨拉丁城堡','the Citadel of Saladin'], by:'Ahmed Al.Badawy from Cairo, Egypt', lic:'CC BY-SA 2.0' },
 { f:'Citadel_of_Aleppo.jpg', h:'5/54', t:['阿勒颇城堡','the Citadel of Aleppo'], by:'Memorino', lic:'CC BY-SA 3.0' },
],
'马穆鲁克': [
 { f:'قلعة_قايتباي_من_الجو.jpg', h:'f/f1', t:['盖贝依城堡(灯塔旧址)','the Qaitbay Citadel'], by:'Hmkree', lic:'CC BY-SA 4.0' },
 { f:'Flickr_-_archer10_(Dennis)_-_Egypt-13A-061_(cropped).jpg', h:'8/84', t:['苏丹哈桑清真寺','the Sultan Hassan mosque'], by:'Dennis G. Jarvis', lic:'CC BY-SA 2.0' },
],
'伊尔汗国': [
 { f:'Gonbad_Soltaniye.jpg', h:'9/93', t:['完者都陵(苏丹尼耶)','the Dome of Soltaniyeh'], by:'Farzad Yousefian', lic:'CC BY-SA 4.0' },
],
'奥斯曼帝国': [
 { f:'Topkapı_-_01.jpg', h:'0/06', t:['托普卡帕宫','Topkapi Palace'], by:'Carlos Delgado', lic:'CC BY-SA 3.0' },
 { f:'SüleymaniyeMosqueIstanbul_(cropped).jpg', h:'3/38', t:['苏莱曼尼耶清真寺','the Suleymaniye Mosque'], by:'Hunanuk', lic:'CC0' },
 { f:'The_Ka\'ba,_Great_Mosque_of_Mecca,_Saudi_Arabia_(4).jpg', h:'8/89', t:['克尔白·天房','the Kaaba'], by:'Richard Mortel', lic:'CC BY 2.0' },
],
'萨法维·波斯': [
 { f:'20180301124354_IMG_4179And6more_Interior_3.jpg', h:'5/54', t:['聚礼清真寺','the Jameh Mosque'], by:'Hamidespanani', lic:'CC BY-SA 4.0' },
 { f:'Palais_du_Golestan,_Téhéran_(5).jpg', h:'a/a9', t:['古列斯坦宫','the Golestan Palace'], by:'ZarlokX', lic:'CC BY-SA 4.0' },
],
'现代中东': [
 { f:'UAE_Dubai_Al_Fahidi_Fort_img1_asv2018-01.jpg', h:'4/45', t:['法希迪堡','Al Fahidi Fort'], by:'A.Savin', lic:'FAL' },
 { f:'Вадим_Чуприна-Кабул_VADIM_CHUPRINA_©_Kabul_09.jpg', h:'3/3a', t:['达鲁拉曼宫','the Darul Aman Palace'], by:'ВАДИМ ЧУПРИНА', lic:'CC BY-SA 4.0' },
 { f:'Ataturk\'s_Mausoleum_(6225341313).jpg', h:'c/ca', t:['凯末尔陵','Anıtkabir'], by:'William Neuheisel from DC, US', lic:'CC BY 2.0' },
],
'斯基泰': [
 { f:'Vas_d\'or_amb_representació_d\'escites,_kurgan_de_Kul-Oba,_segona_meitat_del_segle_IV_aC.JPG', h:'6/6b', t:['库尔奥巴出土金器','gold from Kul-Oba'], by:'Joanbanjo', lic:'CC BY-SA 3.0' },
],
'粟特': [
 { f:'Panjakent,RudakiMuseum.jpg', h:'a/ab', t:['片治肯特遗址','Panjakent'], by:'Bertramz', lic:'CC BY-SA 3.0' },
],
'突厥汗国': [
 { f:'Kultigin_Monument_of_Orkhon_Inscriptions.jpeg', h:'a/a4', t:['鄂尔浑碑铭(阙特勤碑)','the Orkhon inscriptions'], by:'Vezirtonyukuk', lic:'CC BY-SA 4.0' },
],
'回鹘': [
 { f:'Turpan-bezeklik-cuevas-d01.jpg', h:'8/87', t:['柏孜克里克千佛洞','the Bezeklik caves'], by:'', lic:'CC BY-SA 2.5 es' },
 { f:'Kizil_sky.jpg', h:'5/5c', t:['克孜尔千佛洞','the Kizil caves'], by:'Hiroki Ogawa', lic:'CC BY 3.0' },
],
'萨曼王朝': [
 { f:'UZ_Bukhara_Samanid-mausoleum.jpg', h:'5/58', t:['萨曼王陵','the Samanid Mausoleum'], by:'Apfel51', lic:'Public domain' },
],
'喀喇汗王朝': [
 { f:'Kalyan_Minaret,_Bukhara_(Минарет_Калян_в_Бухаре,_Minorai_Kalon).jpg', h:'b/bb', t:['卡扬宣礼塔','the Kalyan Minaret'], by:'Petar Milošević', lic:'CC BY-SA 4.0' },
],
'花剌子模': [
 { f:'Kutlug_Timur_minaret.JPG', h:'e/ea', t:['库特鲁格·帖木儿宣礼塔','the Kutlug Timur minaret'], by:'Tim Williams', lic:'CC BY-SA 3.0' },
 { f:'Urgench.jpg', h:'0/01', t:['库尼亚-乌尔根奇','Konye-Urgench'], by:'The original uploader was Atilin at French Wikipedia.', lic:'CC BY-SA 3.0', s:1 },
],
'西辽·哈剌契丹': [
 { f:'Burana_Tower,_Kyrgyzstan.jpg', h:'1/12', t:['布拉纳塔(八剌沙衮故城)','the Burana tower at Balasagun'], by:'Bernard Gagnon', lic:'CC0' },
],
'蒙古帝国': [
 { f:'Świątynia_Zachodnia_w_klasztorze_Erdene_Dzuu_01.jpg', h:'4/4c', t:['额尔德尼召','Erdene Zuu Monastery'], by:'Marcin Konsek', lic:'CC BY-SA 4.0' },
 { f:'Genghis_Khan_Equestrian_Statue,_photo_by_Vaiz_Ha.jpg', h:'9/93', t:['成吉思汗骑马像','the Genghis Khan equestrian statue'], by:'Vaiz Ha', lic:'CC BY 2.0' },
],
'帖木儿帝国': [
 { f:'ShrineofAmirTimur.jpg', h:'5/5d', t:['古尔·埃米尔陵','the Gur-e-Amir'], by:'Willard84', lic:'CC BY-SA 4.0' },
 { f:'RegistanSquare_Samarkand.jpg', h:'8/8c', t:['雷吉斯坦广场','the Registan'], by:'Registan_-_Gusjer.jpg: Gustavo Jeronimo from Aranjuez, Spain', lic:'CC BY 2.0' },
 { f:'A_model_of_Ulug_Beg_obsrvatory_in_the_Uzbek_National_Muzeum.jpg', h:'f/f5', t:['乌鲁伯格天文台','Ulugh Beg\'s observatory'], by:'Victoria', lic:'CC BY-SA 4.0' },
],
'哈萨克汗国': [
 { f:'Маузолеј_Ходже_Ахмеда_Јасавија_(град_Туркестан,_Казахстан).jpg', h:'c/c2', t:['亚萨维陵','the Mausoleum of Khoja Ahmed Yasawi'], by:'Petar Milošević', lic:'CC BY-SA 3.0' },
 { f:'Mausoleum_of_Khoja_Ahmed_Yasawi_in_Hazrat-e_Turkestan,_Kazakhstan.jpg', h:'6/6c', t:['突厥斯坦城','Turkistan'], by:'Petar Milošević', lic:'CC BY-SA 4.0' },
],
'布哈拉·希瓦·浩罕三汗国': [
 { f:'Kukeldash_Madrasah_inner_yard.jpg', h:'3/31', t:['库克尔达什经学院','the Kukeldash Madrasah'], by:'Ymblanter', lic:'CC BY-SA 4.0' },
 { f:'Islam_Khodja_Madrasa_01.jpg', h:'c/c3', t:['希瓦内城','Itchan Kala, Khiva'], by:'Bgag', lic:'CC0' },
],
'现代中亚': [
 { f:'Astana_Esil_view.jpg', h:'3/34', t:['阿斯塔纳','Astana'], by:'Dauren Nabijan', lic:'CC0' },
],
'印度河文明': [
 { f:'Mohenjodaro_Sindh.jpeg', h:'9/9a', t:['大浴场','the Great Bath'], by:'The original uploader was M.Imran at English Wikipedia', lic:'CC SA 1.0', s:1 },
 { f:'Mohenjodaro_-_view_of_the_stupa_mound.JPG', h:'0/03', t:['摩亨佐达罗','Mohenjo-daro'], by:'Saqib Qayyum', lic:'CC BY-SA 3.0' },
],
'吠陀时代': [
 { f:'Rigveda_MS2097.jpg', h:'0/02', t:['梨俱吠陀写本','a Rigveda manuscript'], by:'Unknown authorUnknown author', lic:'Public domain' },
],
'孔雀王朝': [
 { f:'East_Gateway_-_Stupa_1_-_Sanchi_Hill_2013-02-21_4398.JPG', h:'1/12', t:['桑奇大塔','the Great Stupa at Sanchi'], by:'Biswarup Ganguly', lic:'CC BY 3.0' },
 { f:'Sarnath_capital.jpg', h:'3/38', t:['阿育王狮子柱头','the Lion Capital of Ashoka'], by:'Chrisi1964', lic:'CC BY-SA 4.0' },
],
'百乘王朝': [
 { f:'Karla_caves_Chaitya.jpg', h:'f/ff', t:['卡尔拉石窟','the Karla caves'], by:'Kevin Standage (kevinstandage1@googlemail.com) INDIAN TRAVEL', lic:'CC BY-SA 2.0' },
],
'贵霜帝国': [
 { f:'Kanishka_casket,_Asia,_G33_South_Asia.jpg', h:'9/9a', t:['迦腻色伽舍利函','the Kanishka casket'], by:'Anthony Huan', lic:'CC BY-SA 2.0' },
 { f:'General_View_of_the_main_Butkara-I_Stupa.JPG', h:'9/99', t:['布特卡拉佛塔','the Butkara stupa'], by:'Muhammad Zahir', lic:'CC BY-SA 3.0' },
],
'伐卡塔卡与德干诸国': [
  /* v242.1:阿旃陀第二期洞窟正是这条带的头号成就,而这张图原本只挂在笈多下(笈多卡通篇不提阿旃陀) */
  { f:'Ajanta_(63).jpg', h:'c/c3', t:['阿旃陀石窟','the Ajanta caves'], by:'No machine-readable author provided. Soman assumed (based on', lic:'CC BY 2.5' },
],
'巽伽与恒河诸国': [
  /* v243.1:这张图拍的正是桑奇的东塔门与包石后的塔身 */
  { f:'East_Gateway_-_Stupa_1_-_Sanchi_Hill_2013-02-21_4398.JPG', h:'1/12', t:['桑奇大塔','the Great Stupa at Sanchi'], by:'Biswarup Ganguly', lic:'CC BY 3.0' },
],
'勃兰登堡·普鲁士': [
  /* v247.1:门建于 1791,而「德意志」带 1866 才起——这张图本来挂错了带 */
  { f:'Brandenburger_Tor_abends.jpg', h:'a/a6', t:['勃兰登堡门','the Brandenburg Gate'], by:'Thomas Wolf, www.foto-tw.de', lic:'CC BY-SA 4.0' },
],
'阿瓦·勃固': [
  /* v240.1:信修浮第一次给整座塔贴金,是这条带的头号成就 */
  { f:'Shwedagon_Pagoda_2017.jpg', h:'c/c4', t:['大金塔','the Shwedagon Pagoda'], by:'Bjørn Christian Tørrissen', lic:'CC BY-SA 4.0' },
],
'笈多王朝': [
 { f:'Ajanta_(63).jpg', h:'c/c3', t:['阿旃陀石窟','the Ajanta caves'], by:'No machine-readable author provided. Soman assumed (based on', lic:'CC BY 2.5' },
 { f:'Iron_Pillar,_Delhi,_May_2008.jpg', h:'8/82', t:['德里铁柱','the iron pillar of Delhi'], by:'Photograph taken by Mark A. Wilson (Department of Geology, T', lic:'Public domain' },
],
'中世纪诸王朝': [
 { f:'1_Khajuraho.jpg', h:'e/e7', t:['克久拉霍神庙群','the Khajuraho temples'], by:'PLBechly', lic:'CC BY-SA 4.0' },
 { f:'Elephanta_Caves_Trimurti.jpg', h:'d/d9', t:['象岛石窟','the Elephanta Caves'], by:'Christian Haugen', lic:'CC BY 2.0' },
],
'波罗王朝': [
 { f:'Paharpur_Buddhist_Bihar.jpg', h:'4/42', t:['索玛普利大寺','Somapura Mahavihara'], by:'Abdulmominbd', lic:'CC BY-SA 4.0' },
 { f:'Temple_No.-_3,_Nalanda_Archaeological_Site.jpg', h:'d/dd', t:['那烂陀寺遗址','the ruins of Nalanda'], by:'Odantapuribs', lic:'CC BY-SA 4.0' },
],
'朱罗王朝': [
 { f:'Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_(edit).jpg', h:'d/dd', t:['坦贾武尔布里哈迪斯瓦拉神庙','the Brihadisvara temple, Thanjavur'], by:'Original: Rainer Halama Derivative work: UnpetitproleX', lic:'CC BY-SA 4.0' },
 { f:'Shiva_as_the_Lord_of_Dance_LACMA_edit.jpg', h:'b/bf', t:['舞王湿婆铜像','a Chola bronze Nataraja'], by:'', lic:'Public domain' },
],
'德里苏丹国': [
 { f:'Qutb_Minar_2022.jpg', h:'3/3c', t:['顾特卜塔','the Qutb Minar'], by:'Wasir kasab', lic:'CC BY 4.0' },
],
'维查耶纳伽尔': [
 { f:'Complex_of_Virupaksha_Temple,_Hampi_(04).jpg', h:'b/b9', t:['维鲁巴克沙神庙','the Virupaksha Temple'], by:'iMahesh', lic:'CC BY-SA 4.0' },
],
'马拉塔': [
 { f:'Front_view_of_Shaniwar_Wada_illuminated.jpg', h:'4/4d', t:['沙尼瓦尔宫','Shaniwar Wada'], by:'DesiBoy101', lic:'CC BY 4.0' },
 { f:'Nagarkhana,_Raigad_Fort,_India.jpg', h:'d/de', t:['赖加德要塞','Raigad fort'], by:'Nilamgandhre', lic:'CC BY-SA 4.0' },
],
'莫卧儿帝国': [
 { f:'Garden_of_Babur_By_Dani.jpg', h:'a/a9', t:['巴布尔花园','the Gardens of Babur'], by:'Danial f4', lic:'CC BY-SA 4.0' },
 { f:'Tomb_of_Humayun,_Delhi.jpg', h:'d/d2', t:['胡马雍陵','Humayun\'s Tomb'], by:'Muhammad Mahdi Karim', lic:'GFDL 1.2' },
 { f:'Delhi_fort.jpg', h:'2/2a', t:['红堡','the Red Fort'], by:'PerSona77', lic:'CC BY-SA 3.0' },
],
'英属印度': [
 { f:'Chhatrapati_shivaji_terminus,_esterno_01.jpg', h:'4/4d', t:['贾特拉帕蒂·希瓦吉终点站','Chhatrapati Shivaji Terminus'], by:'Sailko', lic:'CC BY 3.0' },
 { f:'Victoria_Memorial_situated_in_Kolkata.jpg', h:'7/72', t:['维多利亚纪念堂','the Victoria Memorial'], by:'Subhrajyoti07', lic:'CC BY-SA 4.0' },
 { f:'Mumbai_03-2016_30_Gateway_of_India.jpg', h:'3/3a', t:['印度门','the Gateway of India'], by:'A.Savin', lic:'FAL' },
],
'印度·南亚诸国': [
 { f:'Statue_of_Unity.jpg', h:'0/07', t:['团结雕像','the Statue of Unity'], by:'Snehrashmi', lic:'CC BY-SA 4.0' },
 { f:'LotusDelhi.jpg', h:'f/fc', t:['莲花寺','the Lotus Temple'], by:'Vandelizer', lic:'CC BY 2.0' },
 { f:'Independence_Commemoration_Hall.jpg', h:'d/d7', t:['独立纪念堂','Independence Memorial Hall'], by:'Charaka Ranasinghe', lic:'CC BY 2.0' },
],
'扶南': [
 { f:'Angkor_Borei_01.jpg', h:'6/63', t:['吴哥波雷遗址','Angkor Borei'], by:'Stefan Fussan', lic:'CC BY-SA 3.0', s:1 },
],
'三佛齐': [
 { f:'Candi_Muaro_Jambi_di_siang_hari.jpg', h:'6/60', t:['穆阿罗占碑寺庙群','the Muaro Jambi temple compounds'], by:'Ryan Wijaya', lic:'CC BY-SA 4.0' },
],
'高棉·吴哥': [
 { f:'Angkor_Wat.jpg', h:'4/41', t:['吴哥窟','Angkor Wat'], by:'Bjørn Christian Tørrissen', lic:'CC BY-SA 4.0' },
 { f:'Ta_Prohm_(III).jpg', h:'8/8c', t:['塔布茏寺','Ta Prohm'], by:'Supanut Arunoprayote. Feel free to use any of my images', lic:'CC BY 4.0' },
 { f:'Bayon,_Angkor_Thom,_Camboya,_2013-08-17,_DD_37.JPG', h:'f/fa', t:['巴戎寺','the Bayon'], by:'Diego Delso', lic:'CC BY-SA 3.0' },
],
'大越': [
 { f:'Hanoi,_Vietnam_(12041825854).jpg', h:'5/5c', t:['一柱寺','the One Pillar Pagoda'], by:'Clay Gilliland', lic:'CC BY-SA 2.0' },
 { f:'Hanoi_Temple_of_Literature_(cropped).jpg', h:'3/39', t:['文庙','the Temple of Literature'], by:'The original uploader was Chuoibk at English Wikipedia', lic:'CC BY-SA 3.0' },
],
'蒲甘': [
 { f:'Shwedagon_Pagoda_2017.jpg', h:'c/c4', t:['大金塔','the Shwedagon Pagoda'], by:'Bjørn Christian Tørrissen', lic:'CC BY-SA 4.0' },
 { f:'Shwezigon.jpg', h:'4/4f', t:['瑞喜宫塔','the Shwezigon Pagoda'], by:'DIMMIS', lic:'CC BY-SA 3.0' },
 { f:'Bagan,_Myanmar,_Ananda_Temple.jpg', h:'f/fd', t:['阿难陀寺','the Ananda Temple'], by:'Vyacheslav Argenberg', lic:'CC BY 4.0' },
],
'满者伯夷': [
 { f:'Eksotika_Candi_Bajang_Ratu.jpg', h:'1/1c', t:['特罗武兰遗址','Trowulan'], by:'Ivuvisual', lic:'CC BY-SA 4.0' },
],
'马六甲及诸苏丹国': [
 { f:'Malacca_Sultanate_Palace.JPG', h:'d/d4', t:['马六甲苏丹王宫(复原)','the Malacca Sultanate palace (replica)'], by:'Adiput (talk)', lic:'Public domain' },
],
'暹罗': [
 { f:'Wat_Phra_Kaew_by_Ninara_TSP_edit_crop.jpg', h:'c/c1', t:['玉佛寺','Wat Phra Kaew'], by:'Original image: Ninara from Helsinki, Finland. Edit: TSP', lic:'CC BY 4.0' },
 { f:'พระพุทธไสยาสวัดพระเชตุพน.jpg', h:'5/53', t:['卧佛寺','Wat Pho'], by:'Mastertongapollo', lic:'CC BY-SA 4.0' },
],
'欧洲殖民东南亚': [
 { f:'St._Paul\'s_Church_Malacca_2012.JPG', h:'b/bf', t:['圣保罗教堂','St Paul\'s Church'], by:'Bjørn Christian Tørrissen', lic:'CC BY-SA 3.0' },
 { f:'Baluartillo_de_San_José,_Manila,_Filipinas,_2023-08-26,_DD_41.jpg', h:'7/77', t:['王城区城墙','the Intramuros walls'], by:'Diego Delso', lic:'CC BY-SA 4.0' },
 { f:'Fort_Jesus_at_the_Mombasa_Island.jpg', h:'4/41', t:['耶稣堡','Fort Jesus'], by:'Maingi030', lic:'CC BY-SA 4.0', s:1 },
],
'现代东南亚': [
 { f:'Ampera_Bridge_at_Night,_Palembang.jpg', h:'7/76', t:['安佩拉大桥','the Ampera Bridge'], by:'Gunawan Kartapranata', lic:'CC BY-SA 3.0' },
 { f:'20190923_Independence_Palace-10.jpg', h:'7/7d', t:['统一宫','the Reunification Palace'], by:'Balon Greyjoy', lic:'CC0' },
 { f:'Singapore_Skyline_2019-10.jpg', h:'2/2e', t:['鱼尾狮','the Merlion'], by:'Unwicked', lic:'CC BY-SA 4.0' },
],
'三星堆·古蜀': [
 { f:'Gold_Mask_(黄金面罩).jpg', h:'c/c2', t:['三星堆青铜像','a Sanxingdui bronze'], by:'momo', lic:'CC BY 2.0' },
],
'二里头·夏': [
 { f:'20240815_Erlitou_Site_05.jpg', h:'a/a2', t:['二里头遗址','the Erlitou site'], by:'Windmemories', lic:'CC BY-SA 4.0' },
],
'商': [
 { f:'金沙遗址_Jinsha_Site_2018.jpg', h:'8/8e', t:['金沙遗址','the Jinsha site'], by:'xiquinhosilva', lic:'CC BY 2.0' },
 { f:'HouMuWuDingFullView.jpg', h:'c/c2', t:['司母戊鼎(后母戊鼎)','the Houmuwu ding'], by:'Mlogic', lic:'CC BY-SA 3.0' },
 { f:'Orakelknochen.JPG', h:'c/c9', t:['甲骨文','an oracle bone'], by:'', lic:'CC BY-SA 3.0', s:1 },
],
'西周': [
 { f:'Da_Yu_ding.jpg', h:'8/84', t:['大盂鼎','the Da Yu ding'], by:'', lic:'CC BY-SA 4.0' },
 { f:'Ding_cauldron_of_Duke_Mao.jpg', h:'e/e2', t:['毛公鼎','the Mao Gong ding'], by:'anonymous', lic:'CC BY 4.0' },
],
'春秋': [
 { f:'Land_Gate_of_Pan_Men.jpg', h:'d/d2', t:['盘门','the Pan Gate'], by:'钉钉', lic:'CC BY-SA 4.0' },
 { f:'湖北博物館曾侯乙編鐘.jpg', h:'c/c0', t:['曾侯乙编钟','the bells of Marquis Yi of Zeng'], by:'YouTable', lic:'CC BY-SA 4.0' },
],
'战国': [
 { f:'Dujiang_Weir.jpg', h:'a/a7', t:['都江堰','the Dujiangyan irrigation works'], by:'星星', lic:'CC BY-SA 4.0' },
 { f:'20230208_Bronze_sword_used_by_King_Goujian_of_Yue_01.jpg', h:'2/25', t:['越王勾践剑','the Sword of Goujian'], by:'Windmemories', lic:'CC BY-SA 4.0' },
],
'秦': [
 { f:'51714-Terracota-Army.jpg', h:'8/88', t:['秦始皇兵马俑','the Terracotta Army'], by:'xiquinhosilva', lic:'CC BY 2.0' },
 { f:'Tomb_of_the_First_Emperor_Qin_Shi_Huang_Di,_Xi\'an,_China_-_panoramio.jpg', h:'7/73', t:['秦始皇陵','the Mausoleum of the First Qin Emperor'], by:'Aaron Zhu', lic:'CC BY-SA 3.0' },
 { f:'The_Great_Wall_of_China_at_Jinshanling-edit.jpg', h:'2/23', t:['长城','the Great Wall'], by:'Severin.stalder', lic:'CC BY-SA 3.0' },
],
'西汉': [
 { f:'Lacquer_Coffin_Unearthed_from_the_2nd-century-BC_Han_Tomb_No.1_at_Mawangdui_2011-07.JPG', h:'c/c9', t:['马王堆汉墓','the Mawangdui tombs'], by:'猫猫的日记本', lic:'CC BY-SA 4.0' },
 { f:'Dunhuang.yumenguan.jpg', h:'a/af', t:['玉门关','the Jade Gate'], by:'Popolon', lic:'CC BY-SA 3.0' },
 { f:'Xihan_Tomb_1_Jade_Burial_Suit.JPG', h:'2/27', t:['金缕玉衣','a jade burial suit'], by:'Zcm11', lic:'CC BY-SA 3.0' },
],
'东汉': [
 { f:'Image-HK_LeiChengUkHanTombMuseum_Outside.jpg', h:'e/e0', t:['李郑屋汉墓','the Lei Cheng Uk Han tomb'], by:'Chong Fat', lic:'Public domain' },
 { f:'Kinemetrics_seismograph.jpg', h:'0/0f', t:['张衡地动仪(复原)','Zhang Heng\'s seismoscope (reconstruction)'], by:'', lic:'CC BY-SA 3.0' },
],
'三国': [
 { f:'20250913_Gao_Mausoleum_of_Cao_Cao_05.jpg', h:'5/52', t:['曹操高陵','the tomb of Cao Cao'], by:'Windmemories', lic:'CC BY-SA 4.0' },
],
'东晋·十六国': [
 { f:'Lingyin_Temple,_Hangzhou_20161003.jpg', h:'6/66', t:['灵隐寺','the Lingyin Temple'], by:'Tyg728', lic:'CC BY-SA 4.0' },
 { f:'Mogao_Caves_(54376969262).jpg', h:'9/9e', t:['莫高窟','the Mogao Caves'], by:'xiquinhosilva', lic:'CC BY 2.0' },
],
'南北朝': [
 { f:'61292-Yungang-Grottoes_(28498548881).jpg', h:'9/90', t:['云冈石窟','the Yungang Grottoes'], by:'xiquinhosilva', lic:'CC BY 2.0' },
 { f:'Hangingtemple20190929.jpg', h:'d/de', t:['悬空寺','the Hanging Monastery'], by:'Charlie fong', lic:'CC BY-SA 4.0' },
 { f:'27427-Luoyang_(49067744628).jpg', h:'b/b4', t:['龙门石窟','the Longmen Grottoes'], by:'xiquinhosilva', lic:'CC BY 2.0' },
],
'隋': [
 { f:'Zhaozhou_Bridge.jpg', h:'0/03', t:['赵州桥','the Zhaozhou (Anji) Bridge'], by:'English Wikipedia user Zhao 1974', lic:'Public domain' },
],
'唐': [
 { f:'Huaisheng_Mosque_Dec_2007.jpg', h:'7/7f', t:['怀圣寺光塔','the Huaisheng Mosque minaret'], by:'Ismaila1977', lic:'Public domain' },
 { f:'Giant_Wild_Goose_Pagoda.jpg', h:'1/13', t:['大雁塔','the Giant Wild Goose Pagoda'], by:'Alex Kwok', lic:'CC BY-SA 3.0' },
 { f:'Naitou-topparna.JPG', h:'d/d5', t:['乾陵','the Qianling Mausoleum'], by:'Bairuilong', lic:'CC BY-SA 4.0' },
],
'南诏·大理': [
 { f:'20240502_Chongshengsi_Santa_(131232).jpg', h:'d/df', t:['崇圣寺三塔','the Three Pagodas of Dali'], by:'Yumeto', lic:'CC BY-SA 4.0' },
],
'吐蕃': [
 { f:'Jokhang_Temple_in_Tibet.jpg', h:'a/ab', t:['大昭寺','the Jokhang Temple'], by:'onwardtibet.org', lic:'CC BY-SA 2.0', s:1 },
],
'五代十国': [
 { f:'2024-Apr_Suzhou_-_Tiger_Hill_Pagoda_虎丘塔_(Huqiu_Ta)_-_img_05.jpg', h:'c/c6', t:['虎丘塔','the Tiger Hill Pagoda'], by:'Chainwit', lic:'CC BY 4.0' },
],
'北宋': [
 { f:'20240128_Liuhe_Pagoda_01.jpg', h:'d/dc', t:['六和塔','the Liuhe Pagoda'], by:'Windmemories', lic:'CC BY-SA 4.0' },
 { f:'Yuelu_Academy_10844-Changsha_(48757566176).jpg', h:'f/f4', t:['岳麓书院','the Yuelu Academy'], by:'xiquinhosilva', lic:'CC BY 2.0' },
 { f:'20230130_Qingjing_Mosque_01.jpg', h:'6/60', t:['清净寺','the Qingjing Mosque'], by:'Windmemories', lic:'CC BY-SA 4.0' },
],
'南宋': [
 { f:'Quanzhou_Kaiyuan_Temple-the_Hall_of_Mahavira.jpg', h:'4/4a', t:['开元寺双塔','the twin pagodas of Kaiyuan Temple'], by:'Tom@HK', lic:'CC BY 2.0' },
 { f:'Yue_Fei_temple_13.jpg', h:'5/58', t:['岳王庙','the Yue Fei Temple'], by:'This illustration was made by Peter Potrowl. Please credit t', lic:'CC BY 3.0' },
],
'辽': [
 { f:'Datong_Huayan_Si_2013.08.29_08-24-19.jpg', h:'7/7a', t:['华严寺','the Huayan Temple'], by:'Zhangzhugang', lic:'CC BY-SA 3.0' },
 { f:'Dingzhou_Liaodi_Pagoda_3.jpg', h:'4/43', t:['开元寺料敌塔','the Liaodi Pagoda'], by:'User:Zeus1234', lic:'CC BY-SA 3.0' },
 { f:'Pagodaoffogongtemple2019.jpg', h:'2/26', t:['应县木塔','the wooden pagoda of Fogong Temple'], by:'Charlie fong', lic:'CC BY-SA 4.0' },
],
'西夏': [
 { f:'Xi_Xia_Imperial_Tombs_(54154641924).jpg', h:'5/54', t:['西夏王陵','the Western Xia mausoleums'], by:'xiquinhosilva', lic:'CC BY 2.0' },
],
'金': [
 { f:'Lugouqiao-2014.jpg', h:'2/22', t:['卢沟桥','the Marco Polo Bridge'], by:'Alanba42', lic:'CC BY-SA 4.0' },
],
'元': [
 { f:'Miaoying_Temple_8.jpg', h:'5/56', t:['妙应寺白塔','the White Pagoda of Miaoying Temple'], by:'EditQ', lic:'CC0' },
 { f:'Juyongguanfromnorth.jpg', h:'a/a0', t:['居庸关云台','the Cloud Platform at Juyong Pass'], by:'Charlie fong', lic:'CC BY-SA 4.0' },
],
'明': [
 { f:'City_wall_of_Xi\'an_51550-Xian_(27959363326).jpg', h:'3/32', t:['西安城墙','the city walls'], by:'xiquinhosilva', lic:'CC BY 2.0' },
 { f:'Nanjing_Ming_Xiaoling_2017.11.11_08-10-27.jpg', h:'d/d1', t:['明孝陵','the Ming Xiaoling Mausoleum'], by:'Zhangzhugang', lic:'CC BY-SA 4.0' },
 { f:'The_Forbidden_City_-_View_from_Coal_Hill.jpg', h:'e/ef', t:['紫禁城','the Forbidden City'], by:'Pixelflake', lic:'CC BY-SA 3.0' },
],
'清': [
 { f:'Potala_Palace_HQ.jpg', h:'b/b6', t:['布达拉宫','the Potala Palace'], by:'Lhasa Government', lic:'CC BY-SA 4.0' },
 { f:'Bangka_Lungshan_Temple_07.23.jpg', h:'8/87', t:['艋舺龙山寺','the Longshan Temple'], by:'Supanut Arunoprayote. Feel free to use any of my images', lic:'CC BY 4.0' },
 { f:'Gandantegchinlen_Monastery_(2024).jpg', h:'f/ff', t:['甘丹寺','Gandan Monastery'], by:'Chongkian', lic:'CC BY-SA 4.0' },
],
'朝鲜半岛诸王朝': [
 { f:'Tomb_of_King_Tongmyong.jpg', h:'d/d4', t:['高句丽古墓群','the Koguryo tombs'], by:'Sgnpkd', lic:'CC BY-SA 4.0' },
 { f:'Jeongjeon,_Jongmyo_(Autumn,_2012).jpg', h:'1/1a', t:['宗庙','the Jongmyo Shrine'], by:'문화재청', lic:'KOGL Type 1' },
 { f:'광화문_월대.jpg', h:'6/63', t:['景福宫','Gyeongbokgung Palace'], by:'서울관광 아카이브', lic:'KOGL Type 1' },
],
'古代日本': [
 { f:'Kiyomizu.jpg', h:'3/3c', t:['清水寺','Kiyomizu-dera'], by:'Jordy Meow', lic:'CC BY-SA 3.0' },
 { f:'Phoenix_Hall,_Byodo-in,_November_2016_-01.jpg', h:'6/69', t:['平等院凤凰堂','the Phoenix Hall of Byodo-in'], by:'Martin Falbisoner', lic:'CC BY-SA 4.0' },
],
'江户日本': [
 { f:'Sensoji_2023.jpg', h:'4/43', t:['浅草寺','Senso-ji'], by:'Akonnchiroll', lic:'CC0' },
],

'韩国': [
 { f:'Dongdaemun_Design_Plaza_at_night,_Seoul,_Korea.jpg', h:'8/8f', t:['东大门设计广场','Dongdaemun Design Plaza'], by:'Eugene Lim', lic:'CC BY 2.0' },
],
'民国': [
 { f:'Sun_Yat-sen_Mausoleum_-_54400198691.jpg', h:'6/64', t:['中山陵','the Sun Yat-sen Mausoleum'], by:'xiquinhosilva', lic:'CC BY 2.0' },
 { f:'中华民国总统府·南京·航拍.jpg', h:'2/25', t:['南京总统府','the Presidential Palace, Nanjing'], by:'Legolas1024', lic:'CC BY-SA 4.0' },
],
'共和国': [
 { f:'China_Senate_House.jpg', h:'e/ef', t:['人民大会堂','the Great Hall of the People'], by:'Zheng Zhou', lic:'CC BY-SA 3.0' },
 { f:'Beijing_China_Beijing-National-Stadium-01.jpg', h:'2/25', t:['国家体育场(鸟巢)','the Bird\'s Nest stadium'], by:'CEphoto, Uwe Aranas', lic:'CC BY-SA 3.0' },
],
'库施·努比亚': [
 { f:'Sudan_Meroe_Pyramids_2001.JPG', h:'5/53', t:['麦罗埃金字塔群','the Nubian pyramids'], by:'Photographer: B N Chagny', lic:'CC BY-SA 1.0', s:1 },
],
'埃塞俄比亚帝国': [
 { f:'Katedrála_sv._Jiří.jpg', h:'b/b7', t:['圣乔治大教堂','St George\'s Cathedral'], by:'Ondřej Žváček', lic:'CC BY 2.5' },
 { f:'Addis_Ababa_Ethiopia_2.jpg', h:'2/2d', t:['三一大教堂','Holy Trinity Cathedral'], by:'Gize12', lic:'CC BY-SA 4.0', s:1 },
],
'阿克苏姆': [
 { f:'Rome_Stele.jpg', h:'6/69', t:['阿克苏姆方尖碑','the Aksum obelisks'], by:'Ondřej Žváček', lic:'CC BY 2.5' },
],
'斯瓦希里城邦': [
 { f:'Ruins_of_Kilwa_Kisiwani_and_Ruins_of_Songo_Mnara-108279.jpg', h:'f/f8', t:['大清真寺','the Great Mosque'], by:'Ron Van Oers', lic:'CC BY-SA 3.0 igo' },
],
'大津巴布韦': [
 { f:'Conical_Tower_-_Great_Enclosure_III_(33736918448).jpg', h:'d/d4', t:['大围场','the Great Enclosure'], by:'Andrew Moore from Johannesburg, South Africa', lic:'CC BY-SA 2.0' },
],
'马里帝国': [
 { f:'2007_Sankore_Mosque_Timbuktu_02.jpg', h:'1/1d', t:['桑科雷清真寺','the Sankore Mosque'], by:'Anne and David', lic:'Public domain' },
 { f:'Djenne_great_mud_mosque.jpg', h:'7/75', t:['杰内大清真寺','the Great Mosque of Djenné'], by:'Ruud Zwart', lic:'CC BY-SA 3.0' },
],
'阿散蒂': [
 { f:'Manhyia_Palace_Museum.jpg', h:'0/0a', t:['曼希亚王宫','the Manhyia Palace'], by:'Nkansahrexford', lic:'CC BY-SA 3.0', s:1 },
],
'刚果王国': [
 { f:'The_Bansa,_or_residence_of_the_King_of_Kongo,_called_St._Salvador_(M\'Banza_Kongo),_Astley_1745.jpg', h:'3/33', t:['姆班扎刚果','M\'banza-Kongo'], by:'Thomas Astley', lic:'Public domain' },
],
'桑海帝国': [
 { f:'Askia.jpg', h:'a/ab', t:['阿斯基亚陵','the Tomb of Askia'], by:'Taguelmoust', lic:'CC BY-SA 3.0', s:1 },
 { f:'2007_Sankore_Mosque_Timbuktu_02.jpg', h:'1/1d', t:['桑科雷清真寺','the Sankoré Madrasah'], by:'Anne and David', lic:'Public domain' },
],
'欧洲殖民非洲': [
 { f:'Castle_of_Good_Hope,_Cape_Town_01.jpg', h:'a/ae', t:['好望角城堡','the Castle of Good Hope'], by:'Bernard Gagnon', lic:'CC BY-SA 4.0' },
 { f:'Karen_Blixen_House_and_Museum,_Nairobi,_KE.jpg', h:'8/8f', t:['卡伦·布里克森故居','the Karen Blixen house'], by:'Daniel Case', lic:'CC BY-SA 4.0' },
],
'现代非洲': [
 { f:'KICC_nairobi_kenya.jpg', h:'c/c5', t:['肯雅塔国际会议中心','the Kenyatta International Convention Centre'], by:'Original uploader was Mkimemia at en.wikipedia', lic:'CC BY-SA 3.0', s:1 },
 { f:'National_Theatre_Nigeria.jpg', h:'e/e9', t:['尼日利亚国家剧院','the National Theatre'], by:'Godiva Omoruyi', lic:'CC BY-SA 4.0' },
 { f:'African_Union_Conference_Centre_building.jpg', h:'8/84', t:['非洲联盟会议中心','the African Union headquarters'], by:'Andrew Moore', lic:'CC BY-SA 2.0' },
],
'奥尔梅克': [
 { f:'San_Lorenzo_Monument_4_crop.jpg', h:'3/31', t:['奥尔梅克巨石头像','an Olmec colossal head'], by:'Marshall Astor (Life on the Edge)', lic:'CC BY-SA 2.0' },
 { f:'La_Venta_Pirámide_cara_norte.jpg', h:'f/f9', t:['拉本塔遗址','La Venta'], by:'Alfonsobouchot', lic:'Public domain' },
],
'查文文化': [
 { f:'Chavín_de_Huántar_-_51149086708.jpg', h:'6/60', t:['查文德万塔尔遗址','Chavín de Huántar'], by:'Apollo⠀', lic:'CC BY 2.0' },
 { f:'Chavin_lanzon_stela2_cyark.jpg', h:'1/10', t:['兰松石柱','the Lanzón'], by:'CyArk', lic:'CC BY-SA 3.0' },
],
'玛雅': [
 { f:'Tikal_Temple1_2006_08_11.JPG', h:'0/06', t:['一号神庙','Temple I'], by:'Raymond Ostertag', lic:'CC BY-SA 2.5' },
 { f:'Chichen_Itza_3.jpg', h:'5/51', t:['库库尔坎金字塔','El Castillo'], by:'Daniel Schwen', lic:'CC BY-SA 4.0' },
 { f:'Palenque_Collage.jpg', h:'9/90', t:['帕伦克','Palenque'], by:'Ricraider', lic:'CC BY-SA 3.0', s:1 },
],
'特奥蒂瓦坎': [
 { f:'2020-02-11_Teotihuacan_la_Avenida_de_los_Muertos_y_la_Pirámide_del_Sol.jpg', h:'3/3b', t:['太阳金字塔','the Pyramid of the Sun'], by:'Burkhard Mücke', lic:'CC BY-SA 4.0' },
],
'莫切': [
 { f:'Huaca_Sol_lou.jpg', h:'c/c4', t:['太阳神庙(莫切)','the Huaca del Sol'], by:'', lic:'CC BY-SA 3.0' },
 { f:'Señor_de_Sípan_-_Reconstrucción_Facial_Forense.jpg', h:'3/3d', t:['西潘王墓出土物','the Lord of Sipán finds'], by:'Cicero Moraes', lic:'CC BY-SA 4.0' },
],
'瓦里·蒂瓦纳科': [
 { f:'Zonnepoort_tiwanaku.jpg', h:'c/c1', t:['太阳门','the Gate of the Sun'], by:'Mhwater', lic:'Public domain' },
 { f:'PUERTA_DEL_SOL_TIWANAKU.jpg', h:'0/0c', t:['蒂瓦纳科遗址','Tiwanaku'], by:'CLAUDIOLD', lic:'CC BY-SA 4.0' },
],
'奇穆': [
 { f:'Chan_chan_view1.jpg', h:'e/e0', t:['昌昌古城','Chan Chan'], by:'Håkan Svensson', lic:'CC BY-SA 3.0' },
 { f:'Huaca_Arco_Iris_Archaeological_site_-_wall.jpg', h:'0/04', t:['龙神庙(奇穆)','the Huaca del Dragón'], by:'AgainErick', lic:'CC BY-SA 3.0' },
],
'密西西比文化·卡霍基亚': [
 { f:'Monks_Mound_in_July.JPG', h:'2/2d', t:['僧侣丘','Monks Mound'], by:'Skubasteve834', lic:'CC BY-SA 3.0' },
 { f:'Monks_Mound_-_Summer_2024.jpg', h:'a/a4', t:['卡霍基亚僧侣丘','Cahokia'], by:'Skubasteve834', lic:'CC BY 4.0' },
],
'阿兹特克': [
 { f:'Monolito_de_la_Piedra_del_Sol.jpg', h:'6/65', t:['太阳石','the Aztec sun stone'], by:'El Comandante', lic:'CC BY-SA 3.0' },
 { f:'Vista_completa_de_Tenochtitlán.jpg', h:'0/07', t:['特诺奇蒂特兰(复原模型)','Tenochtitlan (model)'], by:'thomas kole', lic:'CC BY 4.0' },
],
'印加': [
 { f:'Sacsayhuamán,_Cusco,_Perú,_2015-07-31,_DD_27.JPG', h:'6/60', t:['萨克塞华曼','Sacsayhuaman'], by:'Diego Delso', lic:'CC BY-SA 4.0' },
 { f:'Machu_Picchu,_2023_(012).jpg', h:'b/bb', t:['马丘比丘','Machu Picchu'], by:'Draceane', lic:'CC BY-SA 4.0' },
],
'西葡殖民美洲': [
 { f:'Catedral_y_Sagrario_Metropolitano_33.jpg', h:'0/0c', t:['大教堂','the Metropolitan Cathedral'], by:'Ulisesmorales', lic:'CC BY-SA 3.0' },
 { f:'Mosteiro_de_São_Bento_01.jpg', h:'1/14', t:['圣本笃修道院','the São Bento Monastery'], by:'Klayton Aurélio de Oliveira', lic:'CC BY-SA 4.0' },
 { f:'Lima_convento_san_francisco_de_asis.jpg', h:'a/af', t:['圣弗朗西斯科修道院','the Monastery of San Francisco'], by:'Velvet', lic:'CC BY-SA 4.0' },
],
'美国': [
 { f:'Capitol_Building_Full_View.jpg', h:'2/27', t:['国会大厦','the Capitol'], by:'Noclip', lic:'Public domain' },
 { f:'The_Chicago_Water_Tower.jpg', h:'8/86', t:['芝加哥水塔','the Chicago Water Tower'], by:'Bernt Rostad', lic:'CC BY 2.0' },
 { f:'Brooklyn_Bridge_and_the_Lower_Manhattan_skyline_from_Pebble_Beach,_New_York.jpg', h:'f/f0', t:['布鲁克林大桥','the Brooklyn Bridge'], by:'Christian David', lic:'CC BY-SA 4.0' },
],
'拉丁美洲诸国': [
 { f:'Fachada_del_Teatro_Colón_en_Buenos_Aires,_Argentina.jpg', h:'8/82', t:['科隆剧院','the Teatro Colón'], by:'EEJCC', lic:'CC0' },
 { f:'2017_Bogotá_Basílica_del_Señor_Caído_de_Monserrate.jpg', h:'8/8f', t:['蒙塞拉特山圣殿','the Monserrate sanctuary'], by:'Felipe Restrepo Acosta', lic:'CC BY-SA 4.0' },
 { f:'Christ_the_Redeemer_-_Cristo_Redentor.jpg', h:'4/4f', t:['救世基督像','Christ the Redeemer'], by:'Arne Müseler', lic:'CC BY-SA 3.0 de' },
],
'澳大利亚原住民': [
 { f:'ULURU.jpg', h:'a/a8', t:['乌鲁鲁','Uluru'], by:'Ek2030372672', lic:'CC BY-SA 4.0' },
 { f:'Ubirr_rock_art.JPG', h:'c/c9', t:['乌比尔岩画','the Ubirr rock art'], by:'Tourism NT', lic:'Attribution' },
],
'汤加帝国': [
 { f:'Haʻamonga.jpg', h:'1/17', t:['哈阿蒙加巨石门','the Haʻamonga ʻa Maui'], by:'Tauʻolunga', lic:'CC BY-SA 3.0' },
],
'南马都尔': [
 { f:'Nan_madol.jpg', h:'c/c3', t:['南马都尔','Nan Madol'], by:'NOAA', lic:'Public domain' },
],
'拉帕努伊·复活节岛': [
 { f:'AhuTongariki.JPG', h:'5/50', t:['摩艾石像','moai'], by:'Ian Sewell', lic:'CC BY 2.5', s:1 },
 { f:'Ahu-Tongariki-from-south-west-2013.jpg', h:'4/41', t:['通加里基祭坛','Ahu Tongariki'], by:'Bjørn Christian Tørrissen', lic:'CC BY-SA 3.0' },
],
'毛利': [
 { f:'One_Tree_Hill,_Auckland,_March_2015.jpg', h:'8/88', t:['一树山毛利要塞遗迹','the Maungakiekie pa terraces'], by:'Techno246', lic:'CC BY-SA 3.0' },
 { f:'Marae,_Raiatea_2.jpg', h:'e/ee', t:['毛利集会所','a marae'], by:'Michel-georges bernard', lic:'CC BY-SA 3.0' },
],
'夏威夷王国': [
 { f:'Iolani_Palace_(51872681413).jpg', h:'8/8e', t:['伊奥拉尼宫','ʻIolani Palace'], by:'Gage Skidmore from Surprise, AZ, United States of America', lic:'CC BY-SA 2.0' },
 { f:'King_Kamehameha_statue_(51872601941).jpg', h:'6/64', t:['卡美哈梅哈一世像','the Kamehameha statue'], by:'Gage Skidmore from Surprise, AZ, United States of America', lic:'CC BY-SA 2.0' },
],
'汤加王国': [
 { f:'Royal_Palace,_Nuku\'alofa,_Nov_18.jpg', h:'9/94', t:['汤加王宫','the Royal Palace, Tonga'], by:'Uhooep', lic:'CC BY-SA 4.0' },
],
'欧洲殖民大洋洲': [
 { f:'HydeParkBarracks.JPG', h:'0/02', t:['海德公园兵营','the Hyde Park Barracks'], by:'The original uploader was J Bar at English Wikipedia', lic:'CC BY-SA 3.0' },
 { f:'Royal_exhibition_building_tulips_straight.jpg', h:'4/43', t:['皇家展览馆','the Royal Exhibition Building'], by:'Photograph taken by Diliff and straightened by Ian Fieggen', lic:'CC BY 2.5' },
],
'澳新与太平洋岛国': [
 { f:'Flinders_Station_and_trams.jpg', h:'9/99', t:['弗林德斯街车站','Flinders Street Station'], by:'Created by Philip Mallis in 2021; cropped by HappyWaldo', lic:'CC BY-SA 3.0' },
 { f:'Sydney_Australia._(21339175489).jpg', h:'a/a0', t:['悉尼歌剧院','the Sydney Opera House'], by:'Bernard Spragg. NZ from Christchurch, New Zealand', lic:'CC0' },
],
'现代欧洲诸国': [
 { f:'SF_maig_2_cropped.jpg', h:'e/ef', t:['圣家堂','the Sagrada Família'], by:'Canaan', lic:'CC BY-SA 4.0' },
 { f:'Casa_Milà,_general_view.jpg', h:'d/de', t:['米拉之家','Casa Milà'], by:'Thomas Ledl', lic:'CC BY-SA 4.0' },
 { f:'Royal_Castle_in_Warsaw,_Poland,_2022,_03.jpg', h:'b/bb', t:['华沙王宫','the Royal Castle'], by:'Chris Olszewski', lic:'CC BY-SA 4.0' },
],
'维京·北欧': [
 { f:'Osebergskipet_2016.jpg', h:'0/0b', t:['奥塞贝格船','the Oseberg ship'], by:'Petter Ulleland', lic:'CC BY-SA 4.0' },
 { f:'Gokstadskipet1.jpg', h:'5/53', t:['戈克斯塔德船','the Gokstad ship'], by:'Karamell', lic:'CC BY-SA 2.5' },
 { f:'Runesten_i_Jelling.jpg', h:'8/81', t:['耶灵石碑','the Jelling stones'], by:'Alicudi', lic:'CC BY-SA 3.0' },
],
'斯里兰卡诸王国': [
 { f:'Sigiriya_(141688197).jpeg', h:'e/e6', t:['狮子岩','Sigiriya'], by:'Wrobell', lic:'CC BY-SA 3.0' },
 { f:'SL_Anuradhapura_asv2020-01_img11_Ruwanwelisaya_Stupa.jpg', h:'0/04', t:['鲁梵伐利大塔','the Ruwanwelisaya'], by:'A.Savin', lic:'FAL' },
 { f:'SL_Kandy_asv2020-01_img33_Sacred_Tooth_Temple.jpg', h:'e/eb', t:['康提佛牙寺','the Temple of the Tooth, Kandy'], by:'A.Savin', lic:'FAL' },
],
'蒙古国': [
 { f:'Chinggis_Square.jpg', h:'c/c9', t:['苏赫巴托尔广场','Sükhbaatar Square'], by:'Zazaa Mongolia', lic:'CC BY-SA 4.0' },
 { f:'Genghis_Khan_Equestrian_Statue,_photo_by_Vaiz_Ha.jpg', h:'9/93', t:['成吉思汗骑马像','the Genghis Khan equestrian statue'], by:'Vaiz Ha', lic:'CC BY 2.0' },
],
'朝鲜': [
 { f:'Prázdné_slnice_a_rozestavěný_hotel_Ryugyong_-_panoramio.jpg', h:'a/a5', t:['柳京饭店','the Ryugyong Hotel'], by:'Martin Cígler', lic:'CC BY-SA 3.0' },
 { f:'070401_Panmunjeom3.jpg', h:'e/ea', t:['板门店与非军事区','Panmunjom and the DMZ'], by:'Driedprawns at en.wikipedia', lic:'CC BY 2.5' },
],
'北欧诸王国': [
 { f:'Borgund_Stave_Church_in_Lærdalen,_2013_June.jpg', h:'e/e2', t:['博尔贡木板教堂','Borgund stave church'], by:'Ximonic (Simo Räsänen)', lic:'CC BY-SA 3.0' },
],
'教皇国': [
 { f:'Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg', h:'f/f5', t:['圣彼得大教堂','St Peter\'s Basilica'], by:'Alvesgaspar', lic:'CC BY-SA 4.0' },
],
'加喜特巴比伦': [
 { f:'Caillou_Michaux_CdM.jpg', h:'6/6c', t:['界石「库杜鲁」','a kudurru boundary stone'], by:'Marie-Lan Nguyen', lic:'Public domain' },
],
'弗里吉亚': [
 { f:'Gordion_Early_Phrygian_East_Gate.jpg', h:'0/0c', t:['戈尔迪翁的早期城门','the early Phrygian gate at Gordion'], by:'Gordion Archive, Penn Museum', lic:'CC BY-SA 4.0' },
],
'本都王国': [
 { f:'Amasya-Pontisches_Grab-02.JPG', h:'1/18', t:['阿马西亚崖壁上的本都王陵','the rock tombs of the Pontic kings at Amasya'], by:'Michael F. Schönitzer', lic:'CC BY-SA 4.0' },
],
'摩洛哥诸王朝': [
 { f:'Marokko0112_(retouched).jpg', h:'4/49', t:['马拉喀什的库图比亚宣礼塔','the Kutubiyya minaret, Marrakesh'], by:'Rol1000', lic:'CC BY-SA 4.0' },
],
'海湾诸邦': [
 { f:'Dhow_znz.jpg', h:'8/80', t:['航行中的单桅帆船','a dhow under sail'], by:'Muhammad Mahdi Karim', lic:'GFDL 1.2' },
],
'加兹尼王朝': [
 { f:'Minaret_of_Bahram_Shah_(with_Minaret_of_Mas\'ud_III_in_the_background)._Ghazni,_Afghanistan_2014.jpg', h:'8/87', t:['加兹尼的两座宣礼塔','the minarets of Ghazni'], by:'AhmadElhan', lic:'CC BY-SA 4.0' },
],
'北元·蒙古诸部': [
 { f:'Świątynia_Zachodnia_w_klasztorze_Erdene_Dzuu_01.jpg', h:'4/4c', t:['额尔德尼召','Erdene Zuu monastery'], by:'Marcin Konsek', lic:'CC BY-SA 4.0' },
],
'东察合台·叶尔羌': [
 { f:'2015-09-12-123007_-_Moschee_beim_Grabmal_der_Amann_Shahan_Isa_Khan.jpg', h:'a/aa', t:['莎车的阿勒屯清真寺','the Altyn Mosque, Yarkand'], by:'Zossolino', lic:'CC BY-SA 4.0' },
],
'阿富汗': [
 { f:'Blue_Mosque_in_the_northern_Afghan_city_in_2012.jpg', h:'c/c9', t:['马扎里沙里夫的蓝色清真寺','the Blue Mosque, Mazar-i-Sharif'], by:'Sgt. Kimberly Lamb (U.S. Armed Forces)', lic:'Public domain' },
],
'印度-希腊诸王': [
 { f:'CapitalSharp.jpg', h:'9/9c', t:['阿伊哈努姆出土的科林斯柱头','a Corinthian capital from Ai-Khanoum'], by:'World Imaging', lic:'Public domain', s:1 },
],
'早期孟加拉': [
 { f:'Paharpur_Buddhist_Bihar.jpg', h:'4/42', t:['索马普拉大寺(帕哈尔普尔)','Somapura Mahavihara, Paharpur'], by:'Abdulmominbd', lic:'CC BY-SA 4.0' },
],
'真腊': [
 { f:'Durga_temple,_Prasat_Sambor_Kuk_N9,_Cambodia_01.jpg', h:'7/78', t:['三波坡雷古的砖塔','a brick tower at Sambor Prei Kuk'], by:'Ms Sarah Welch', lic:'CC0' },
],
'西藏诸政权': [
 { f:'Sakya_monastery6.jpg', h:'2/21', t:['萨迦寺','Sakya monastery'], by:'Antoine Taveneaux', lic:'CC BY-SA 3.0' },
],
'扎格维王朝': [
 { f:'Lalibela,_san_giorgio,_esterno_24.jpg', h:'a/aa', t:['拉利贝拉的圣乔治堂','Bete Giyorgis, Lalibela'], by:'Sailko', lic:'CC BY 3.0' },
],
'努比亚诸王国': [
 { f:'Faras_Saint_Anne.jpg', h:'7/78', t:['法拉斯壁画上的圣安妮','Saint Anne, a wall painting from Faras'], by:'Anonymous (Faras)', lic:'Public domain' },
],
'穆塔帕与托尔瓦': [
 { f:'ZW_Khami_Ruins.JPG', h:'4/4e', t:['卡米遗址的干石墙','dry-stone walls at Khami'], by:'Digr', lic:'CC BY-SA 4.0' },
],
'帕查卡马克与中部海岸': [
 { f:'Pachacamac_-_51163366566.jpg', h:'a/af', t:['帕查卡马克遗址','the ruins of Pachacamac'], by:'Apollo', lic:'CC BY 2.0' },
],
'托尔特克与谷地诸邦': [
 { f:'Telamones_Tula.jpg', h:'c/c9', t:['图拉的石武士','the stone warriors at Tula'], by:'User:Luidger', lic:'CC BY-SA 3.0' },
],
'吕底亚': [
 { f:'Lydia_-_king_Kroisos_-_561-546_BC_-_gold_stater_-_foreparts_of_lion_and_bull_-_two_quadrata_incusa_-_München_SMS.jpg', h:'5/5b', t:['克罗伊斯金币:狮牛相对','A gold stater of Croesus: lion facing bull'], by:'ArchaiOptix', lic:'CC BY-SA 4.0' },
],
'鲜卑': [
 { f:'花树状金步摇06323.jpg', h:'4/4a', t:['花树状金步摇(北票房身村出土)','A tree-shaped gold buyao ornament from Fangshen, Beipiao'], by:'Augusthaiho', lic:'CC BY-SA 4.0' },
],
'归义军': [
 { f:'Caves_16-17_of_Mogao_Grottoes_(20230918142815).jpg', h:'f/f5', t:['莫高窟第16—17窟,17窟即藏经洞','Mogao caves 16–17 — Cave 17 is the Library Cave'], by:'N509FZ', lic:'CC BY-SA 4.0' },
],
};
