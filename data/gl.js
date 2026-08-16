/* ---------- 鼎盛区间(按文明名索引;中国各朝的 gl 内联在 CIVS 中) ---------- */
const GL = {
'古希腊': [
 { a:-470, b:-320, k:'thought', t:['哲学黄金期','Golden age of philosophy'], d:['苏格拉底、柏拉图、亚里士多德三代师承。','Socrates, Plato, Aristotle - three generations.'] },
 { a:-480, b:-400, k:'art', t:['悲剧与帕特农','Tragedy & the Parthenon'], d:['埃斯库罗斯、索福克勒斯、欧里庇得斯三个人的剧本,和帕特农神庙是同一代人做出来的。神庙的柱子中段特意做粗、四角柱略向内倾,是为了抵消人眼的错觉——远看才笔直。','The plays of Aeschylus, Sophocles and Euripides came from the same generation that built the Parthenon. Its columns swell slightly at the middle and lean fractionally inward at the corners to correct for the eye — which is why they look straight.'] } ],
'罗马帝国': [
 { a:-27, b:180, k:'econ', t:['罗马和平','Pax Romana'], d:['两百年里地中海是一个内海:一套货币、一套法律、一条海路,埃及的粮食运到罗马、西班牙的橄榄油运到不列颠。船只不必再防海盗,运费降到后来一千多年都没再达到的水平。','For two centuries the Mediterranean was one sea: one currency, one law, one set of routes — Egyptian grain to Rome, Spanish olive oil to Britain. Shipping no longer had to reckon with pirates, and freight costs fell to a level not seen again for over a thousand years.'] },
 { a:-27, b:150, k:'tech', t:['工程时代','Engineering age'], d:['八万公里干道、把山泉引进城的引水渠,以及火山灰混凝土——万神殿的穹顶直径 43 米,没有钢筋,一千八百年过去仍是世界最大的无筋混凝土穹顶。','Eighty thousand kilometres of highway, aqueducts carrying spring water into the cities, and volcanic-ash concrete — the dome of the Pantheon spans 43 metres without steel and is still, after eighteen centuries, the largest unreinforced concrete dome in the world.'] },
 { a:100, b:235, k:'thought', t:['法学家时代','The great jurists'], d:['罗马法体系成形,泽被后世大陆法。','Roman law systematized - the root of civil law.'] } ],
'拜占庭': [
 { a:528, b:565, k:'thought', t:['查士丁尼法典','Justinian codification'], d:['查士丁尼派人把此前一千年的罗马法令与法学家意见编成《民法大全》,删掉互相矛盾的部分。这套书 11 世纪在意大利被重新发现,成了此后欧洲大学法学院的教材,大陆法系就是从它长出来的。','Justinian had a thousand years of Roman statutes and jurists\' opinions compiled into the Corpus Juris Civilis, with the contradictions cut out. Rediscovered in Italy in the eleventh century, it became the textbook of European law faculties, and the civil-law tradition grew from it.'] },
 { a:867, b:1056, k:'art', t:['马其顿文艺复兴','Macedonian Renaissance'], d:['9 到 11 世纪,君士坦丁堡重新抄写与研究古希腊典籍,圣像艺术也从毁像运动中恢复。今天读得到的古希腊文献,多数是靠这一时期的抄本传下来的。','From the ninth to the eleventh century Constantinople copied and studied the Greek classics afresh, and icon painting recovered from the years of iconoclasm. Most Greek literature we can read today survives through the manuscripts of this period.'] } ],
'阿拉伯哈里发': [
 { a:780, b:900, k:'thought', t:['翻译运动','Translation movement'], d:['巴格达的智慧宫组织人把希腊、波斯、印度的医学、数学与哲学译成阿拉伯语,译者按稿酬付钱。亚里士多德的不少著作是先有阿拉伯译本、几百年后才由此回译成拉丁文,欧洲才重新读到。','The House of Wisdom in Baghdad had Greek, Persian and Indian medicine, mathematics and philosophy translated into Arabic, paying its translators by the work. Several of Aristotle\'s books survived in Arabic first and were rendered back into Latin centuries later — which is how Europe read them again.'] },
 { a:800, b:1000, k:'tech', t:['代数与天文','Algebra & astronomy'], d:['花剌子米的书名 al-jabr 后来变成了 algebra(代数),他的名字则变成了 algorithm(算法);巴格达的天文台连年观测,编出的星表在此后很长一段时间里都是最好的一批。','The title of al-Khwarizmi\'s book, al-jabr, became the word algebra, and his own name became algorithm; the observatory at Baghdad observed year after year and produced star tables that were among the best for a long time after.'] },
 { a:750, b:950, k:'econ', t:['两洋枢纽','Hub of two seas'], d:['印度洋与地中海贸易在巴格达汇流。','Indian Ocean and Mediterranean trade meet at Baghdad.'] } ],
'奥斯曼帝国': [
 { a:1450, b:1600, k:'econ', t:['三洲商路','Tri-continental trade'], d:['亚、欧、非三洲的商路都要从它的地界上过:黑海运来的粮、波斯来的生丝、印度洋来的香料,进出都得在关口交税。这笔过路钱是国库里最稳的一块现金收入——不过奥斯曼真正的财政大头,始终是土地上收来的农业税。','The trade roads of three continents all crossed its territory: grain from the Black Sea, raw silk from Persia, spices from the Indian Ocean — all of it paid duty at its customs houses. Those tolls were the steadiest cash the treasury had — though the bulk of Ottoman revenue always came from taxes on farming.'] },
 { a:1520, b:1600, k:'art', t:['希南建筑时代','Age of Sinan'], d:['苏莱曼尼耶清真寺群,奥斯曼美学定型。','The Suleymaniye and the classical Ottoman style.'] } ],
'波斯(阿契美尼德)': [ { a:-520, b:-400, k:'econ', t:['御道与贡赋','Royal Road economy'], d:['从苏萨到萨迪斯的御道两千多公里,沿途设驿站换马换人,信使七天就能跑完全程,寻常人走要三个月。二十个行省按定额缴纳贡赋,整座帝国靠这两样运转。','The Royal Road ran more than two thousand kilometres from Susa to Sardis with posting stations to change horse and rider, so a messenger covered it in seven days where an ordinary traveller took three months. Twenty satrapies paid fixed tribute, and on these two things the empire ran.'] } ],
'古埃及': [
 { a:-2600, b:-2400, k:'tech', t:['金字塔工程','Pyramid engineering'], d:['吉萨的胡夫金字塔用了两百多万块石头,建成之后的三千八百年里一直是地球上最高的建筑,直到 14 世纪才被一座欧洲教堂的尖顶超过——没有铁器、没有滑轮,靠的是斜坡、木橇与人力。','The Great Pyramid at Giza took over two million blocks and remained the tallest structure on earth for three thousand eight hundred years, until the spire of a European cathedral passed it in the fourteenth century — built with no iron and no pulleys, on ramps and sledges and human labour.'] },
 { a:-1550, b:-1150, k:'art', t:['神庙时代','Temple age'], d:['卡纳克神庙群前后修了近两千年,历代法老各加盖一段;帝王谷则把陵墓改挖进山谷的岩壁里防盗,六十多座墓里,图坦卡蒙那座是保存得最完整的一座。','Karnak was built and rebuilt over nearly two thousand years, each pharaoh adding his own part; in the Valley of the Kings the tombs were cut into the rock instead to foil robbers, and of the sixty-odd found there Tutankhamun\'s was the most nearly intact.'] } ],
'苏美尔·阿卡德': [ { a:-3300, b:-2900, k:'tech', t:['文字与历法','Writing & calendar'], d:['用芦苇杆在湿泥板上压出的楔形符号,是已知最早的文字;他们用六十进制算数,今天一小时六十分、一圈三百六十度都是从这儿来的;历法按月亮走,再靠闰月追上太阳年。','Wedge marks pressed into wet clay with a reed are the earliest writing known; they counted in sixties, which is why an hour has sixty minutes and a circle three hundred and sixty degrees; and their calendar followed the moon, kept in step with the sun by intercalary months.'] } ],
'笈多王朝': [
 { a:380, b:500, k:'tech', t:['零与天文','Zero & astronomy'], d:['阿耶波多在 5 世纪就提出星空每晚转动是因为地球自转,还算出圆周率约 3.1416;同时期印度把「零」当成一个数来算,加上位值制,这套记数法经阿拉伯传到欧洲,就是今天全世界用的数字。','In the fifth century Aryabhata proposed that the night sky turns because the earth rotates, and calculated π as about 3.1416; in the same period India treated zero as a number in its own right and used place value — a system that reached Europe through the Arabs and is the one the whole world writes in today.'] },
 { a:380, b:470, k:'art', t:['梵语古典','Sanskrit classics'], d:['迦梨陀娑的剧本《沙恭达罗》18 世纪译到欧洲,歌德读后专门写诗称赞。这一时期的梵语戏剧与长诗,定下了此后一千多年印度文学的样子。','Kalidasa\'s play Shakuntala reached Europe in the eighteenth century and Goethe wrote a poem in praise of it. The Sanskrit drama and verse of this period set the shape of Indian literature for the thousand years that followed.'] } ],
'莫卧儿帝国': [
 { a:1560, b:1660, k:'art', t:['泰姬陵与细密画','Taj & miniatures'], d:['泰姬陵把波斯的穹顶与拱门配上印度的白大理石和宝石镶嵌,建了二十多年;细密画则是波斯的画法加印度的题材,一整幅常常只有巴掌大,要用几根毛的笔来画。','The Taj Mahal set Persian domes and arches on Indian white marble inlaid with stone, and took over twenty years to build; the miniature joined Persian technique to Indian subjects, a whole picture often no bigger than a palm and painted with brushes of a few hairs.'] },
 { a:1580, b:1700, k:'econ', t:['棉纺织出口','Cotton exports'], d:['印度棉布当时卖遍全世界,从东南亚到西非都在穿。英国为保护本国毛纺织业立法限制它进口,反倒逼着自己去造纺纱机器——工业革命的一条起因就在这里。','Indian cotton cloth was worn from South-East Asia to West Africa. Britain restricted its import by law to protect its own woollen trade, and in doing so drove itself to build spinning machinery — one of the roots of the Industrial Revolution.'] } ],
'维京·北欧': [
 { a:800, b:1000, k:'tech', t:['长船','The longship'], d:['叠板造船,吃水不到一米,横渡北海也能划进内河;奥塞贝格船与戈克斯塔德船至今完整。','Clinker-built, drawing under a metre, able to cross the North Sea and row up rivers; the Oseberg and Gokstad ships survive whole.'] },
 { a:800, b:1000, k:'econ', t:['从波罗的海到巴格达的贸易网','A trade network from the Baltic to Baghdad'], d:['毛皮、蜜蜡与奴隶顺俄罗斯河流南下,阿拉伯银币成万枚地流回瑞典。','Furs, wax and slaves went south down the Russian rivers, and Arab silver flowed back to Sweden by the tens of thousands.'] } ],
'文艺复兴意大利': [
 { a:1400, b:1500, k:'econ', t:['银行与商业','Banking & commerce'], d:['美第奇银行在欧洲各大城市设分行,用汇票让商人不必带着现金赶路;复式记账把每一笔钱记两遍、两边必须对得上——今天全世界的账仍然这么做。','The Medici bank kept branches in the major cities of Europe and used bills of exchange so merchants need not travel with cash; double-entry bookkeeping recorded every sum twice and required the two sides to agree — the whole world still keeps accounts this way.'] },
 { a:1480, b:1530, k:'art', t:['盛期文艺复兴','High Renaissance'], d:['达芬奇、米开朗基罗、拉斐尔同城竞技。','Leonardo, Michelangelo and Raphael in rivalry.'] } ],
'西班牙·葡萄牙帝国': [
 { a:1545, b:1640, k:'econ', t:['白银世纪','The silver century'], d:['波托西白银撑起第一个全球贸易循环。','Potosi silver powers the first global loop.'] },
 { a:1580, b:1660, k:'art', t:['黄金世纪','Siglo de Oro'], d:['《堂吉诃德》被算作第一部现代小说——它讲的是一个读骑士小说读疯了的人;委拉斯开兹的《宫娥》把画家自己、国王夫妇的镜像和观众放进同一个空间,三百多年来一直在被重新解读。','Don Quixote is reckoned the first modern novel — its subject is a man driven mad by reading chivalric romances; and Velázquez\'s Las Meninas puts the painter himself, the king and queen reflected in a mirror, and the viewer into one space, and has been reinterpreted ever since.'] } ],
'荷兰共和国': [
 { a:1600, b:1670, k:'econ', t:['黄金时代','Golden Age'], d:['17 世纪荷兰的人均财富是欧洲最高的,而它没有国王、没有大片土地,靠的是转口贸易、造船与金融。阿姆斯特丹银行的存款凭证可以直接付款,是最早的准纸币之一。','In the seventeenth century the Dutch were the wealthiest people per head in Europe, with no king and little land — living on entrepôt trade, shipbuilding and finance. Deposit receipts at the Bank of Amsterdam could be used to settle payments, among the earliest things resembling paper money.'] },
 { a:1630, b:1670, k:'art', t:['伦勃朗与维米尔','Rembrandt & Vermeer'], d:['别处的画家画国王与圣徒,荷兰画家画市民、画厨房、画一束光落在墙上。买画的是商人而不是宫廷,画因此变小、变多、变得日常——维米尔一生只留下三十几幅。','Elsewhere painters painted kings and saints; Dutch painters painted citizens, kitchens, and a shaft of light on a wall. Their buyers were merchants rather than courts, so the pictures got smaller, more numerous and more everyday — Vermeer left only some thirty-five in his life.'] } ],
'法兰西': [
 { a:1720, b:1789, k:'thought', t:['启蒙运动','The Enlightenment'], d:['伏尔泰、卢梭、孟德斯鸠这批人把「凭什么」问到了王权与教会头上;狄德罗主编的《百科全书》花了二十多年、写了七万多个条目,把当时的全部知识摊开给识字的人看。','Voltaire, Rousseau and Montesquieu turned the question by what right on the throne and the church; the Encyclopédie that Diderot edited took over twenty years and more than seventy thousand articles to lay the whole of contemporary knowledge open to anyone who could read.'] },
 { a:1860, b:1910, k:'art', t:['印象派时代','Impressionist era'], d:['莫奈、雷诺阿这批人把画架搬到户外,画光和空气而不画清楚的轮廓,当时被官方沙龙拒之门外、被评论家嘲笑;今天他们的画是全世界最贵的一批,巴黎也因此成了艺术之都。','Monet, Renoir and the rest took their easels outdoors to paint light and air rather than clear outlines; the official Salon turned them away and the critics laughed. Their canvases are now among the most valuable in the world, and Paris became the capital of art because of them.'] } ],
'大英帝国·英国': [
 { a:1687, b:1727, k:'thought', t:['牛顿时代','Age of Newton'], d:['《自然哲学的数学原理》用三条运动定律加一个万有引力公式,把天上行星的轨道和地上苹果的下落算成了同一件事;此后两百多年,物理学都在这个框架里做题。','The Principia used three laws of motion and one formula for gravity to make the orbit of a planet and the fall of an apple the same problem; for the next two centuries physics worked inside that frame.'] },
 { a:1770, b:1850, k:'tech', t:['工业革命','Industrial Revolution'], d:['蒸汽机、铁路与工厂制度在几十年里改写了人怎么干活:1851 年万国博览会上,英国与它的殖民地的展品占了全场近一半,「世界工厂」这个称呼在那次展会上被彻底叫响——这说法本身 1838 年就有人用了。','Steam engines, railways and the factory rewrote how work was done within decades: at the Great Exhibition of 1851 Britain and its colonies supplied nearly half the exhibits, and it was there that the name workshop of the world caught on — the phrase itself had been in use since 1838.'] },
 { a:1815, b:1914, k:'econ', t:['全球贸易金融','Global trade & finance'], d:['19 世纪世界贸易的大部分用英镑结算,伦敦城的银行给全球放贷,劳合社给全球的船保险。谁要修铁路、要发国债,多半得先到这几条街上来谈——这套安排比它的殖民地活得更久。','Most of the world\'s trade in the nineteenth century was settled in sterling, the banks of the City lent to the whole world and Lloyd\'s insured its shipping. Anyone building a railway or floating a loan generally had to come to these few streets first — an arrangement that outlived the colonies.'] } ],
'美国': [
 { a:1876, b:1915, k:'tech', t:['发明时代','Age of invention'], d:['电灯、电话、汽车、飞机接连问世。','Light, telephone, car, airplane.'] },
 { a:1945, b:1973, k:'econ', t:['战后繁荣','Postwar boom'], d:['战争刚结束时,美国一国的工业产出接近全世界一半;此后二十多年里,普通工人买得起房和车,「中产」第一次成为社会的多数;布雷顿森林体系把各国货币钉住美元、美元钉住黄金,美国由此成为世界货币的锚。','Just after the war the United States turned out close to half the world\'s industrial output; over the twenty-odd years that followed, ordinary workers could afford a house and a car, and the middle class became the majority for the first time; Bretton Woods pegged other currencies to the dollar and the dollar to gold, making America the anchor of world money.'] },
 { a:1970, b:2025, k:'tech', t:['信息革命','Information revolution'], d:['晶体管、集成电路、个人电脑、互联网、智能手机——这条链上的关键一步几乎每一次都发生在美国,而且多数出自同一片湾区;今天的人工智能仍在这条链上往下走。','The transistor, the integrated circuit, the personal computer, the internet, the smartphone — nearly every decisive step on that chain happened in the United States, most of them around one bay; today\'s artificial intelligence is the next link on it.'] } ],
'日本': [
 { a:1760, b:1850, k:'art', t:['浮世绘','Ukiyo-e'], d:['葛饰北斋的《神奈川冲浪里》与歌川广重的东海道系列是木版套色印的,当时是平民买得起的商品画;19 世纪它们随货物流到欧洲,梵高照着临摹过,莫奈家里挂满了这些画。','Hokusai\'s Great Wave and Hiroshige\'s Tokaido series were colour woodblock prints, cheap pictures ordinary people bought. They reached Europe with cargo in the nineteenth century, where Van Gogh copied them and Monet\'s house was hung with them.'] },
 { a:1955, b:1990, k:'econ', t:['经济奇迹','Economic miracle'], d:['战败二十多年后,日本从废墟变成世界第二大经济体:1964 年新干线通车、东京办奥运,此后汽车与家电卖遍全球,「日本制造」一度是精工细作的同义词。','Twenty-odd years after defeat, Japan went from ruins to the second-largest economy in the world: the bullet train opened and Tokyo hosted the Olympics in 1964, and its cars and electronics then sold everywhere — made in Japan became a byword for precision.'] },
 { a:1980, b:2025, k:'art', t:['动漫与游戏','Anime & games'], d:['手冢治虫之后,漫画成了日本最普及的一种表达;宫崎骏的动画、任天堂与索尼的游戏机,把这套视觉语言送到了全世界孩子手里——今天很多人认识日本是从这里开始的。','After Tezuka Osamu, comics became the most widely used form of expression in Japan; Miyazaki\'s films and the consoles of Nintendo and Sony carried that visual language to children everywhere — for many people today it is where knowing Japan begins.'] } ],
'现代欧洲诸国': [
 { a:1957, b:2004, k:'thought', t:['把主权放到一张桌子上','Sovereignty pooled at one table'], d:['从 1957 年六国的共同市场到 2004 年二十五国的联盟,历史上少见的自愿让渡主权——关税、农业、竞争规则和一部分外交由布鲁塞尔的一张桌子决定。','From the six-nation common market of 1957 to a union of twenty-five in 2004 — a rare voluntary pooling of sovereignty, with tariffs, farming, competition rules and part of foreign policy decided at one table in Brussels.'] },
 { a:1945, b:1975, k:'econ', t:['战后经济奇迹','The postwar economic miracle'], d:['马歇尔计划与共同市场之下,意大利、荷兰、北欧三十年高速增长,北欧走出高税收高福利的路。','Under the Marshall Plan and the common market Italy, the Netherlands and the Nordics grew fast for thirty years, and the Nordics took the road of high taxes and generous welfare.'] } ],
'俄罗斯·苏联': [
 { a:1820, b:1880, k:'art', t:['文学黄金时代','Literary golden age'], d:['普希金到托尔斯泰、陀思妥耶夫斯基。','Pushkin to Tolstoy and Dostoevsky.'] },
 { a:1957, b:1975, k:'tech', t:['太空竞赛','Space race'], d:['1957 年的斯普特尼克是人类第一颗人造卫星,1961 年加加林是第一个进入太空的人——两次都比美国早,正是这两次让美国下决心送人上月球。','Sputnik in 1957 was the first artificial satellite and Gagarin in 1961 the first human in space — both ahead of the United States, and it was those two that pushed America to commit to putting a man on the Moon.'] } ],
'玛雅': [ { a:250, b:900, k:'tech', t:['历法与天文','Calendar & astronomy'], d:['玛雅的长纪历能一直记到几千年后而不重复;他们把金星的运行周期算到每五百年才差不到一天,算出的太阳年也比同时期欧洲用的儒略历更接近真值——而这一切没有望远镜。','The Maya Long Count could run for thousands of years without repeating, and they tracked the cycle of Venus to within a day over five centuries, and their solar year came closer to the true one than the Julian calendar Europe was using — all of it without a telescope.'] } ],
'印加': [ { a:1440, b:1530, k:'tech', t:['道路与农业工程','Roads & terraces'], d:['三万多公里的驿道翻越安第斯山,沿途设驿站,接力跑的信使一天能把消息送出两百多公里;梯田把陡坡改成能耕的平台,配上引水渠,在四千米的高处种出了粮食。','Over thirty thousand kilometres of road crossed the Andes with relay posts along them, and running messengers could carry news over two hundred kilometres in a day; terraces turned steep slopes into workable ground and, with irrigation channels, grew crops four thousand metres up.'] } ],
'高棉·吴哥': [ { a:1110, b:1220, k:'art', t:['吴哥建筑巅峰','Angkor at its height'], d:['吴哥窟一般被认为是今天世界上最大的宗教建筑群,五座塔象征神话里的须弥山;巴戎寺的石塔上刻着两百多张巨大的人脸,刻的是谁至今没有定论。','Angkor Wat is generally reckoned the largest religious complex in the world today, its five towers standing for the mythical Mount Meru; the towers of the Bayon carry over two hundred giant carved faces, and whose faces they are is still unsettled.'] } ],
'商': [
 { a:-1300, b:-1046, k:'tech', t:['青铜范铸','Piece-mould bronze'], d:['后母戊鼎重八百余公斤,一次浇铸而成。','The 830 kg Houmuwu ding, cast in one pour.'] },
 { a:-1250, b:-1046, k:'thought', t:['甲骨占卜','Oracle-bone divination'], d:['成熟的汉字体系,连同王室的每一次问卜。','A mature script — and every royal question recorded.'] } ],
'西周': [ { a:-1040, b:-841, k:'thought', t:['礼乐制度','Rites and music'], d:['周公制礼作乐,后世儒家反复回望的源头。','Zhou Gong\'s order, the model Confucians looked back to.'] } ],
'秦': [ { a:-221, b:-210, k:'tech', t:['标准化工程','Standardization'], d:['文字、度量衡、车轨、律令,一次性统一。','Script, weights, axle-width and law — unified at a stroke.'] } ],
'东汉': [
 { a:100, b:140, k:'tech', t:['造纸与浑天仪','Paper and the armillary sphere'], d:['蔡伦用树皮、麻头、破布造出便宜好写的纸,书写材料从此不再是竹简与丝帛;同时期张衡造出水力驱动的浑天仪演示星象,还做了候风地动仪,据记载测到过洛阳感觉不到的陇西地震。','Cai Lun made cheap, writable paper from bark, hemp and rags, and writing no longer had to go on bamboo strips or silk; in the same years Zhang Heng built a water-driven armillary sphere to model the heavens, and a seismoscope which is recorded as having detected an earthquake in Gansu that no one in Luoyang had felt.'] },
 { a:67, b:200, k:'thought', t:['经学与佛教东传','Classics, and Buddhism arrives'], d:['洛阳白马寺是中国最早的官办佛寺,佛教从此有了落脚点;同时儒家内部今文与古文两派争得厉害,朝廷把经书刻在石碑上立于太学门外,让天下读书人有个统一的本子可抄。','The White Horse Monastery at Luoyang was the first state-founded Buddhist temple in China, giving the religion a foothold; meanwhile the two schools of Confucian scholarship argued so fiercely that the court had the classics cut into stone tablets outside the academy so everyone could copy from one authorised text.'] } ],
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
 { a:1276, b:1300, k:'tech', t:['天文与水利','Astronomy and waterworks'], d:['郭守敬造了十几种天文仪器,在全国二十七处测日影,据此编成《授时历》——一年定为 365.2425 日,与今天用的公历同一个数,却早了三百年;他还主持修通了从大都到通州的运河。','Guo Shoujing built more than a dozen astronomical instruments and measured the sun\'s shadow at twenty-seven stations across the country, and from that produced the Shoushi calendar — a year of 365.2425 days, the same figure the Gregorian calendar uses but three centuries earlier; he also cut the canal linking the capital to Tongzhou.'] },
 { a:1271, b:1330, k:'econ', t:['欧亚大通道','The Eurasian corridor'], d:['驿站相连,泉州港与海运同时鼎盛。','Post roads inland, Quanzhou\'s harbour at sea.'] } ],
'朝鲜半岛诸王朝': [
 { a:1150, b:1250, k:'art', t:['高丽青瓷','Goryeo celadon'], d:['翡色镶嵌,当时中国人也推为第一。','Kingfisher-green inlay, rated first even in China.'] },
 { a:1234, b:1450, k:'tech', t:['金属活字与谚文','Metal type and Hangul'], d:['金属活字早于古腾堡两百年;世宗造字给百姓用。','Metal type 200 years before Gutenberg; an alphabet for commoners.'] } ],
'韩国': [
 { a:1962, b:1997, k:'econ', t:['汉江奇迹','Miracle on the Han'], d:['1960 年代初韩国还是世界上最穷的国家之一,三十五年后成了造船与半导体的强国。做法是把有限的资金押在几个财阀身上、逼它们出口挣外汇,代价是长期的威权统治与 1997 年那场债务危机。','In the early 1960s Korea was among the poorest countries in the world; thirty-five years later it was a major power in shipbuilding and semiconductors. It did this by betting scarce capital on a few conglomerates and forcing them to export — at the cost of long authoritarian rule and the debt crisis of 1997.'] },
 { a:1997, b:2025, k:'art', t:['韩流','The Korean Wave'], d:['电视剧、电影与流行音乐被当成出口产业来做:政府补贴、公司系统地训练艺人。《寄生虫》拿了奥斯卡最佳影片,是第一部得此奖的非英语片;防弹少年团几次登上美国公告牌榜首。','Television, film and pop music were run as export industries, with state support and companies training performers systematically. Parasite won Best Picture, the first film not in English to do so, and BTS reached number one on the American charts several times.'] } ],
'民国': [ { a:1915, b:1927, k:'thought', t:['新文化运动','New Culture Movement'], d:['白话文取代文言,德先生与赛先生登场。','Vernacular replaces classical; Democracy and Science arrive.'] } ],
'米诺斯·迈锡尼': [ { a:-1700, b:-1450, k:'art', t:['克诺索斯壁画','Knossos frescoes'], d:['海豚、跳牛与明快的蓝,与埃及的庄严相反。','Dolphins, bull-leapers, bright blue — the anti-Egypt.'] } ],
'中世纪西欧': [
 { a:1140, b:1300, k:'art', t:['哥特式教堂','Gothic cathedrals'], d:['尖拱把力往下导、飞扶壁在外面顶住侧推力,墙因此不必承重,可以整面掏空装彩色玻璃。当时多数人不识字,窗上的画就是他们读的圣经;沙特尔大教堂 13 世纪的玻璃至今还在原位。','The pointed arch carried the load downward and the flying buttress took the outward thrust from outside, so the wall no longer had to hold the building up and could be opened for glass. Most people could not read, and the windows were their Bible; the thirteenth-century glass at Chartres is still in place.'] },
 { a:1150, b:1300, k:'thought', t:['大学与经院哲学','Universities and scholasticism'], d:['博洛尼亚、巴黎、牛津成型,阿奎那调和信仰与理性。','Bologna, Paris, Oxford; Aquinas weds faith to reason.'] } ],
'德意志': [
 { a:1900, b:1933, k:'thought', t:['物理学之都','Capital of physics'], d:['普朗克、爱因斯坦与哥廷根学派,直到人才流散。','Planck, Einstein, Gottingen — until the exodus.'] },
 { a:1950, b:1990, k:'econ', t:['经济奇迹','The Wirtschaftswunder'], d:['战败时城市成片是瓦砾,二十年后西德成了欧洲最大的工业国。靠的是马歇尔计划的启动资金、并未被炸垮的工业底子,以及把大批技术工人重新组织起来的双元制学徒训练。','Its cities were fields of rubble at the defeat; twenty years later West Germany was Europe\'s largest industrial economy — on Marshall Plan capital, on an industrial base that the bombing had not in fact destroyed, and on an apprenticeship system that put its skilled workers back to work.'] } ],
'加喜特巴比伦': [
  { a:-1400, b:-1155, k:'thought', t:['《吉尔伽美什》定本','Gilgamesh made standard'], d:['祭司把早先零散的诗篇整理成一部完整的史诗,今天读到的版本来自这次编定;而它能传下来,靠的是七百年后亚述巴尼拔图书馆里的抄本。','Priests worked the older scattered poems into one complete epic; the text read today descends from this recension — and it survived thanks to copies made seven centuries later in the library at Nineveh.'] },
  { a:-1400, b:-1200, k:'econ', t:['马与青金石','Horses and lapis'], d:['两河下游的粮食之外,真正让它在国际上说得上话的是马与青金石——阿马尔那的信里,法老要的正是这两样。','Beyond the grain of the lower rivers, what gave it standing abroad were horses and lapis lazuli — the two things pharaoh keeps asking for in the Amarna letters.'] },
],
'赫梯': [ { a:-1400, b:-1200, k:'tech', t:['铁器与战车','Iron and chariots'], d:['最早成规模用铁,轻型战车纵横近东。','The first at scale with iron; light chariots rule the Near East.'] } ],
'迦太基': [ { a:-600, b:-264, k:'econ', t:['西地中海商网','Western Mediterranean network'], d:['从西班牙银矿到北非谷仓,一张海上账本。','From Spanish silver to African grain, one seaborne ledger.'] } ],
'希腊化王朝': [ { a:-300, b:-150, k:'tech', t:['亚历山大里亚科学','Alexandrian science'], d:['欧几里得的几何、阿基米德的力学、地球周长的测算。','Euclid\'s geometry, Archimedes\' mechanics, the Earth measured.'] } ],
'帕提亚·萨珊': [
 { a:100, b:600, k:'econ', t:['丝路中段','The middle Silk Road'], d:['东西货物必经其手,转口即是国策。','All East-West goods pass through — brokerage as policy.'] },
 { a:240, b:400, k:'thought', t:['琐罗亚斯德与摩尼','Zoroaster and Mani'], d:['国教确立,同时诞生一个横跨欧亚的新信仰。','A state church — and a new faith that spread both ways.'] } ],
'塞尔柱突厥': [ { a:1065, b:1150, k:'thought', t:['内扎米亚学院','The Nizamiyya schools'], d:['官办学院体系成型,安萨里在此讲学。','State-funded colleges; al-Ghazali taught here.'] } ],
'伊尔汗国': [ { a:1259, b:1310, k:'tech', t:['马拉盖天文台','Maragheh observatory'], d:['图西的行星模型,后来出现在哥白尼书里。','Tusi\'s planetary models resurface in Copernicus.'] } ],
'萨法维·波斯': [ { a:1590, b:1666, k:'art', t:['伊斯法罕','Isfahan'], d:['"伊斯法罕半天下"——广场、蓝穹与花园城。','"Isfahan is half the world": squares, blue domes, gardens.'] } ],
'蒙古帝国': [ { a:1240, b:1330, k:'econ', t:['驿站与欧亚贸易','The yam and Eurasian trade'], d:['从中国到黑海一路设驿站,持金牌的信使换马不换人,几个月就能跑完全程。商路因此在一个世纪里畅通无阻,马可·波罗、阿拉伯商人、教皇的使节都是走这条路——货、技术和黑死病也一起走。','Post stations ran from China to the Black Sea, and a courier with a tablet of authority changed horses without stopping, crossing the whole distance in months. For a century the roads were open: Marco Polo, Arab merchants and papal envoys all travelled them — and so did goods, techniques and the Black Death.'] } ],
'帖木儿帝国': [
 { a:1417, b:1449, k:'tech', t:['撒马尔罕天文台','Samarkand observatory'], d:['兀鲁伯星表的精度,两百年内无人超越。','Ulugh Beg\'s tables stood unbeaten for two centuries.'] },
 { a:1400, b:1500, k:'art', t:['帖木儿细密画','Timurid miniatures'], d:['赫拉特画派,后来的波斯与莫卧儿都从这里学。','The Herat school, teacher to Persia and the Mughals.'] } ],
'突厥汗国': [ { a:720, b:744, k:'thought', t:['突厥文字','The Orkhon script'], d:['鄂尔浑碑铭:草原民族第一次用自己的文字写自己。','The steppe writes its own history for the first time.'] } ],
'印度河文明': [ { a:-2500, b:-1900, k:'tech', t:['城市规划与排水','City grids and drains'], d:['统一砖尺、直角街道、家家有下水道。','Standard bricks, right-angle streets, drains in every house.'] } ],
'吠陀时代': [ { a:-1200, b:-600, k:'thought', t:['吠陀与奥义书','Vedas and Upanishads'], d:['口传数百年不失一字,再转向"我是谁"。','Centuries of flawless oral transmission, then: who am I?'] } ],
'孔雀王朝': [
 { a:-528, b:-400, k:'thought', t:['沙门思潮','The shramana ferment'], d:['佛教与耆那教同时兴起,挑战婆罗门。','Buddhism and Jainism rise together against the Brahmins.'] },
 { a:-268, b:-232, k:'thought', t:['阿育王护法','Ashoka\'s dharma'], d:['石柱诏令刻满帝国,使团远至希腊化诸王。','Edicts across the empire, envoys to the Greek kings.'] } ],
'印度-希腊诸王': [
  { a:-150, b:-50, k:'art', t:['希腊手艺落在这里','Greek craft takes root here'], d:['希腊的雕刻、建筑与钱币工艺在旁遮普与犍陀罗扎下根;它们后来是犍陀罗佛像的来源之一,但佛像本身要到几百年后才出现。','Greek sculpture, architecture and die-cutting take root in the Punjab and Gandhara. They later feed into the Gandharan Buddha — but the Buddha image itself is still centuries away.'] },
  { a:-160, b:-100, k:'thought', t:['《弥兰陀王问经》','The Milinda Panha'], d:['希腊国王追问「到底是谁在轮回」,僧人拿他自己的马车作答:拆开来哪一件都不是车。','A Greek king presses on who exactly is reborn; the monk answers with the king\'s own chariot — take it apart and no single piece is the chariot.'] },
],
'贵霜帝国': [
 { a:100, b:250, k:'art', t:['犍陀罗艺术','Gandharan art'], d:['最早的一批佛像出自犍陀罗与秣菟罗,东亚佛像的祖型。','The earliest Buddha images, from Gandhara and Mathura.'] },
 { a:100, b:200, k:'thought', t:['大乘北传','Mahayana heads north'], d:['经丝路进入中国,此后两千年的东亚底色。','Along the Silk Road into China, and East Asia is changed.'] } ],
'朱罗王朝': [
 { a:1000, b:1070, k:'econ', t:['印度洋海权','Sea power in the Indian Ocean'], d:['1025 年朱罗舰队跨过孟加拉湾突袭三佛齐,是印度史上少有的远洋远征;此后泰米尔商人的行会一路做到苏门答腊与中国泉州,泉州出土的印度教石刻就是他们留下的。','In 1025 a Chola fleet crossed the Bay of Bengal to raid Srivijaya, a rare oceanic expedition in Indian history; afterwards Tamil merchant guilds traded as far as Sumatra and Quanzhou in China, where the Hindu carvings dug up in the city are what they left behind.'] },
 { a:985, b:1070, k:'art', t:['青铜与石庙','Bronzes and stone temples'], d:['失蜡法铸的舞王湿婆像,一圈火焰里单腿立着,是印度雕塑最有名的形象之一;坦贾武尔的布里哈迪希瓦拉神庙塔高 66 米,塔顶那块石头重达数十吨,怎么运上去至今是个问题。','The lost-wax bronze of Shiva dancing inside a ring of fire on one leg is among the best-known images in Indian sculpture; the Brihadishvara temple at Thanjavur rises 66 metres, and how the capstone of many tonnes was got to the top is still an open question.'] } ],
'斯里兰卡诸王国': [
 { a:-250, b:1200, k:'tech', t:['水库与水渠','Tanks and canals'], d:['旱区里几千座人工湖存下雨季的水,养活大人口;波罗迦罗摩海堤坝长十多公里,今天还在灌溉。','Thousands of man-made lakes in the dry zone stored the monsoon and fed a large population; the Sea of Parakrama, its embankment over ten kilometres long, still waters the fields.'] },
 { a:-100, b:500, k:'thought', t:['把佛经写下来,把历史写下来','Scriptures and history put in writing'], d:['南传佛经约前 1 世纪首次写在贝叶上;5 世纪起的《大史》是亚洲连续最长的史书之一。','The Theravada canon was first written on palm leaves around the first century BC; the Mahavamsa, begun in the fifth century, is among the longest continuous histories in Asia.'] } ],
'德里苏丹国': [ { a:1206, b:1350, k:'art', t:['印度-伊斯兰建筑','Indo-Islamic architecture'], d:['顾特卜塔:波斯的拱与印度的石匠。','The Qutb Minar: Persian arch, Indian masons.'] } ],
'英属印度': [ { a:1853, b:1900, k:'tech', t:['铁路与电报','Railways and telegraph'], d:['为统治铺的网,后来成了独立运动的血管。','Built to rule; later the arteries of independence.'] } ],
'三佛齐': [
 { a:700, b:1100, k:'econ', t:['海峡枢纽','Gatekeeper of the Straits'], d:['所有往来中国与印度的船都要在此停靠。','Every ship between China and India put in here.'] },
 { a:671, b:1000, k:'thought', t:['佛学中心','A Buddhist centre'], d:['唐代僧人义净去印度取经,路上在这里停了几年学梵文,他写下巨港「僧众逾千」、佛法之盛与印度不相上下,劝后来的取经人也先在这儿打好底子。','The Tang monk Yijing broke his journey to India here for several years to learn Sanskrit, and wrote that Palembang held over a thousand monks and that Buddhist learning there matched India\'s — advising later pilgrims to prepare here first.'] } ],
'阿瓦·勃固': [
  { a:1453, b:1500, k:'art', t:['大金塔的高度','The Shwedagon\'s height'], d:['大金塔始建远早于此,但它今天的规模来自这一时期的加高与贴金:信修浮捐出与自己体重相等的黄金,达摩悉提又加了更多。','The Shwedagon was founded far earlier, but it owes its present scale to raisings and gildings in these decades — Shin Sawbu gave her own weight in gold, and Dhammazedi added more.'] },
  { a:1287, b:1500, k:'thought', t:['两种文字并行','Two scripts side by side'], d:['缅语文学在阿瓦成熟,勃固的宫廷同时用孟语与巴利语;达摩悉提整顿僧团、与斯里兰卡重新接上戒法。','Burmese literature came of age at Ava while the court at Pegu worked in Mon and Pali; Dhammazedi reformed the order and reconnected its ordination line to Sri Lanka.'] },
],
'满者伯夷': [ { a:1350, b:1400, k:'econ', t:['群岛贸易网','The archipelago network'], d:['丁香与肉豆蔻只长在马鲁古的几座小岛上,满者伯夷把它们收上来,经爪哇的港口转手卖到中国、印度与波斯。控制转口而不占产地,是这类海上强权的常见做法。','Cloves and nutmeg grew only on a few islands in the Moluccas; Majapahit gathered them and resold them through the ports of Java to China, India and Persia. Controlling the transhipment rather than the source was how sea powers of this kind usually worked.'] } ],
'库施·努比亚': [ { a:-750, b:-350, k:'econ', t:['尼罗河的金与铁','Nile gold and iron'], d:['麦罗埃的冶铁炉与埃及的黄金来源。','Meroe\'s furnaces, and where Egypt\'s gold came from.'] } ],
'阿克苏姆': [ { a:300, b:600, k:'econ', t:['红海贸易','Red Sea trade'], d:['自铸金币,与罗马波斯印度三方通商。','Its own gold coinage, trading with Rome, Persia and India.'] } ],
'加纳帝国': [ { a:800, b:1150, k:'econ', t:['黄金换食盐','Gold for salt'], d:['南方的金与撒哈拉的盐,等重交换。','Southern gold and Saharan salt, weight for weight.'] } ],
'斯瓦希里城邦': [ { a:1200, b:1500, k:'econ', t:['季风贸易','The monsoon trade'], d:['借季风往返阿拉伯与印度,基尔瓦富甲一方。','Riding the monsoon to Arabia and India.'] } ],
'大津巴布韦': [ { a:1300, b:1450, k:'econ', t:['内陆黄金','Inland gold'], d:['无灰浆干砌石墙,黄金经东岸出海。','Mortarless stone walls; gold flowing to the coast.'] } ],
'桑海帝国': [ { a:1470, b:1590, k:'thought', t:['廷巴克图学术','Timbuktu\'s scholars'], d:['桑科雷清真寺周围聚着学者与学生,讲法学、天文、医学;书商行会把手抄本卖到整个西非。2012 年武装分子占领廷巴克图时,当地人把几十万册手抄本藏进铁皮箱、装船运走,大部分保住了。','Scholars and students gathered around the Sankore mosque to study law, astronomy and medicine, and a guild of booksellers carried manuscripts across West Africa. When armed groups took Timbuktu in 2012, local people packed hundreds of thousands of manuscripts into metal trunks and shipped them out; most were saved.'] } ],
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
'北元·蒙古诸部': [
  { a:1571, b:1635, k:'econ', t:['长城下的互市','Markets under the Wall'], d:['隆庆和议后开了十一处马市,用马换茶、布与铁锅;抢了两百年之后,买反而更划算。','Eleven horse markets opened after 1571 — horses for tea, cloth and iron pots. After two centuries of raiding, buying turned out to pay better.'] },
  { a:1578, b:1635, k:'thought', t:['喇嘛教传遍蒙古','Lamaism sweeps the steppe'], d:['俺答汗给出「达赖喇嘛」称号之后,寺院取代萨满,蒙古文佛经也在这几十年里译出。','After Altan Khan conferred the title, monasteries displaced the shamans and the Mongolian Buddhist canon was translated.'] },
],
'东察合台·叶尔羌': [
  { a:1514, b:1680, k:'econ', t:['丝路南道的玉','Jade on the southern road'], d:['和田的玉往东出嘉峪关、往西过帕米尔;明代宫廷用的玉大半从这条路来,而绿洲之间隔着沙漠,谁控制水井谁抽税。','Khotan jade went east through the Jiayu Pass and west over the Pamirs. Most jade at the Ming court came this way — and between the oases lay desert, so whoever held the wells took the toll.'] },
  { a:1348, b:1500, k:'thought', t:['蒙古人改信伊斯兰教','The Mongols turn Muslim'], d:['秃黑鲁帖木儿受戒后,史书说他带着部众一起改宗;成吉思汗的后代从此在这里以穆斯林君主的身份统治。','After Tughlugh Timur took the faith the chronicles say his followers converted with him; Chinggis\'s descendants ruled here as Muslim sovereigns thereafter.'] },
],
'哈萨克汗国': [ { a:1500, b:1700, k:'art', t:['口传史诗与冬不拉','Oral epic and the dombra'], d:['没有文字的年代,历史靠弹唱一代代传下去。','Before writing, history travelled by song.'] } ],
'布哈拉·希瓦·浩罕三汗国': [ { a:1500, b:1700, k:'thought', t:['经学院之城','City of madrasas'], d:['布哈拉一城的经学院数以百计,号称"伊斯兰之穹"。','Hundreds in Bukhara alone — "the dome of Islam".'] } ],
'回鹘': [ { a:757, b:840, k:'econ', t:['绢马贸易','Silk for horses'], d:['一匹马换四十匹绢,唐朝欠账到国库紧张。','Forty bolts of silk per horse — the Tang ran up a debt.'] } ],
'中世纪诸王朝': [ { a:700, b:1100, k:'art', t:['凿山为庙','Temples cut from the rock'], d:['埃洛拉的凯拉萨神庙自上而下整体凿出。','Kailasa at Ellora was carved downward out of one cliff.'] } ],
'印度·南亚诸国': [ { a:1991, b:2025, k:'tech', t:['软件与航天','Software and space'], d:['班加罗尔的外包产业,与低成本的探月探火。','Bangalore\'s outsourcing, and budget missions to Moon and Mars.'] } ],
'扶南': [ { a:150, b:500, k:'econ', t:['两洋之间的转口港','Port between two oceans'], d:['印度洋来的船在此卸货,换船再去南海。','Cargo from the Indian Ocean changed ships here for the China seas.'] } ],
'大越': [ { a:1075, b:1400, k:'thought', t:['科举与儒制','Examinations and Confucian rule'], d:['用中原的制度工具,守自己的独立。','Chinese statecraft, deployed to stay independent of China.'] } ],
'马六甲及诸苏丹国': [ { a:1400, b:1511, k:'econ', t:['香料转口港','The spice entrepot'], d:['葡萄牙人记下这里的码头上同时听得到八十四种语言。马六甲海峡是印度洋与南海之间最短、最好走的那道窄口,季风一年换两次向,船必须在这里等风、卸货、转手——港口因此靠收停泊税与转口费吃饭。','The Portuguese recorded eighty-four languages spoken on its wharves. The strait is the shortest and easiest gate between the Indian Ocean and the South China Sea, and with the monsoon reversing twice a year ships had to wait here for the wind, unload and trade on — so the port lived on anchorage dues and transhipment.'] } ],
'暹罗': [ { a:1351, b:1767, k:'thought', t:['上座部佛教王权','Theravada kingship'], d:['王是护法者也是功德最高者,寺院即学校。','The king as chief patron and merit-maker; the monastery as school.'] } ],
'现代东南亚': [ { a:1985, b:2025, k:'econ', t:['制造业接力','The factory relay'], d:['日本、四小龙、中国之后,产业链落到这里。','After Japan, the Tigers and China, the chain lands here.'] } ],
'三星堆·古蜀': [ { a:-1300, b:-1100, k:'art', t:['青铜神树与面具','Bronze trees and masks'], d:['一棵铜神树近四米高,纵目面具的眼球向外凸出十几厘米——样式在中国独一份。','A bronze tree nearly four metres tall, and masks whose eyes jut out a hand\'s width — nothing else in China looks like it.'] } ],
'二里头·夏': [ { a:-1700, b:-1600, k:'tech', t:['最早的青铜礼器','The first bronze ritual vessels'], d:['爵与绿松石龙形器:礼制在此有了实物。','Bronze jue cups and a turquoise dragon — ritual made tangible.'] } ],
'西晋': [ { a:266, b:300, k:'thought', t:['玄学与《三国志》','Mystic learning, and the Sanguozhi'], d:['清谈风起,陈寿同时写下最可靠的三国信史。','Pure conversation flourishes as Chen Shou writes the sober history.'] } ],
'马里帝国': [
 { a:1300, b:1400, k:'econ', t:['黄金之国','The land of gold'], d:['一度供应旧大陆近一半的黄金。1324 年曼萨·穆萨去麦加朝觐,一路上散金太多,据当时的阿拉伯史家记载,开罗的金价此后好几年都没缓过来——这趟路也把马里画进了欧洲人的地图。','It once supplied close to half the gold of the Old World. When Mansa Musa went on pilgrimage to Mecca in 1324 he gave away so much along the way that Arab historians of the time record that the price of gold in Cairo stayed down for years afterwards — and that journey put Mali on European maps.'] },
 { a:1327, b:1450, k:'thought', t:['廷巴克图学统','Timbuktu\'s learning'], d:['廷巴克图的清真寺就是学校,学生跟着某位学者读书而不是进某个机构;书靠手抄,一部好书的价钱高过一匹马,家族把手抄本一代代传下来——今天仍有几十万册散在当地人家里。','In Timbuktu the mosque was the school, and a student read with a particular scholar rather than enrolling in an institution; books were copied by hand, a good one cost more than a horse, and families passed their manuscripts down the generations — hundreds of thousands are still held in private houses there.'] } ],
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
 { a:1180, b:1500, k:'tech', t:['礁盘上垒起的玄武岩城','A basalt city stacked on the reef'], d:['柱状玄武岩横竖交叠、像搭木屋一样垒成高墙,近百座人工小岛立在潮间礁坪上;没有金属工具、轮子和役畜。','Columnar basalt laid crosswise like a log cabin into high walls, close to a hundred man-made islets standing on the tidal reef — with no metal tools, wheels or draught animals.'] } ],
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
'北欧诸王国': [
  { a:1130, b:1350, k:'art', t:['木板教堂','The stave churches'], d:['整座教堂用立起来的木板搭成,不用一根铁钉,屋脊刻着龙头——基督教的建筑,做工与纹样还是维京人的。中世纪建过上千座,今存 28 座。','Whole churches built of upright planks without a single iron nail, dragon heads carved along the roof ridges — Christian buildings whose craft and ornament are still Viking. A thousand or more were built; twenty-eight survive.'] },
  { a:1429, b:1814, k:'econ', t:['厄勒海峡的过路税','The Sound Dues'], d:['进出波罗的海的船都要过这道海峡,丹麦架炮收税(1658 年丢掉斯科讷之前两岸都是它的),长期是王室最大的一笔进项。','Every ship into or out of the Baltic had to pass the Sound, where Denmark mounted guns and collected a toll, holding both shores until 1658 — for long stretches the crown\'s largest single revenue.'] } ],
'海湾诸邦': [
  { a:1300, b:1500, k:'econ', t:['霍尔木兹的转口时代','The Hormuz entrepôt'], d:['一座不产淡水也不长庄稼的小岛,靠收过往船只的税成为印度洋贸易的枢纽,波斯人说它是世界这枚戒指上的宝石。','An island with no fresh water and no crops became the hub of Indian Ocean trade on the tolls it took from passing ships; the Persians called it the jewel in the ring of the world.'] },
  { a:1850, b:1912, k:'econ', t:['珍珠的顶峰','The height of the pearl trade'], d:['南岸几乎所有的钱都从珠场来,几百条船、上万人出海,珠子经印度卖到欧洲。','Almost all the money on the southern shore came from the pearl banks — hundreds of boats and many thousands of men — and the pearls went through India to Europe.'] } ],
'摩洛哥诸王朝': [
  { a:1271, b:1465, k:'thought', t:['非斯的学院时代','The madrasa age in Fez'], d:['马林诸王在非斯一座接一座地盖学院,从 1271 年的萨法林开始,阿塔林、布伊纳尼亚都建于此后几十年,城市成为伊斯兰世界最重要的学问中心之一。','The Marinid kings put up college after college in Fez, beginning with the Saffarin in 1271 — the Attarine and the Bou Inania both date from the decades after — and the city became one of the chief centres of learning in the Muslim world.'] },
  { a:1578, b:1603, k:'econ', t:['糖与黄金','Sugar and gold'], d:['三王之战后,甘蔗制糖与跨撒哈拉的黄金让萨阿德富极一时,素丹艾哈迈德因此得了「黄金的」这个外号。','After the Battle of the Three Kings, cane sugar and trans-Saharan gold made the Saadians briefly rich, and Sultan Ahmad was nicknamed the Golden for it.'] } ],
'阿富汗': [
  { a:1964, b:1973, k:'thought', t:['宪政十年','The constitutional decade'], d:['颁布宪法,1965 年第一次普选,女性进入议会,报刊也放开了——现代史上最开放的十年,终于 1973 年的政变。','A constitution, the first general election in 1965, women in parliament and a press left alone — the most open decade in its modern history, ended by the coup of 1973.'] } ],
'蒙古国': [
 { a:1990, b:2025, k:'thought', t:['没有流血的转型','A transition without blood'], d:['1990 年绝食示威后执政党没有开枪,几个月后自由选举;此后政权多次和平轮换。','After the hunger strikes of 1990 the ruling party did not shoot; free elections followed within months, and power has changed hands peacefully many times since.'] } ],
'朝鲜': [
 { a:1953, b:1970, k:'econ', t:['战后重建','Postwar reconstruction'], d:['靠苏联、中国援助和煤铁重工业,1960 年代一度比南方富。','On Soviet and Chinese aid and its own coal and heavy industry, richer than the south for a time in the 1960s.'] } ],
};
