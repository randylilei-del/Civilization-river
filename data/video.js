/*   '幕府时代':   '江户日本':   '近现代日本':   '幕府时代':   '江户日本':   '近现代日本': ---------- 纪录片:人工策展 ----------
   键 = CIVS.n,值 = 数组(一个文明可配多部,按阶段拆)。
   每项:b = B 站 BV 号,y = YouTube 视频 ID(可选),t = 片名[zh,en]。

   ⚠ **B 站不能页内嵌播**:player.bilibili.com 对大量视频已不再放行(2026-08 实测
   BV1SV411K7eW,直接以顶层页面打开也只出"你感兴趣的视频都在B站"的兜底图,
   video 元素 readyState 恒为 0、无错误码)。所以 b 一律渲染成新标签页跳原片,
   只有 y(YouTube)走页内嵌播放。中文界面优先 B 站、英文优先 YouTube。

   ⚠ 这张表**只能填人工核实过的链接**。不要凭印象生成 BV 号或 YouTube ID:
   编出来的要么是死链,要么指向完全无关的内容——这个页面的用户是小孩,
   后者比没有更糟。没有条目的文明只显示"搜纪录片"按钮,不显示播放器。

   加法:确认视频确实在讲这个文明、时长与画质过得去之后,照下面的样子加一行。
   B 站 BV 号在视频链接里 bilibili.com/video/BV1xx411c7mu 的 BV 开头那段。 */
const VIDEO = {
  /* ---- 2026-08-15 Ray 批量提供的中华文明批(v173):每条经 B 站公开接口核实
     标题/UP 主/状态当场对得上才入(播放量均百万级)。Ray 单里另有两条,经 Ray 拍板**不采用**:
     三国的「万古史官」(推书频道网文解说)与南宋的「满江红」(影评向)——不适合挂给 7 岁。 ---- */
  '二里头·夏': [ { b:'BV1aB4y1m76o', t:['二里头是夏朝的都城吗','Erlitou: capital of the Xia?'] } ],
  '西周': [ { b:'BV1NTktYwETs', t:['商周之变:礼乐从哪来','The Shang-Zhou transition'] } ],
  '春秋': [ { b:'BV18z421a72k', t:['一口气看懂春秋史','The Spring and Autumn era in one go'] } ],
  '战国': [ { b:'BV1DnCLBKEVU', t:['九小时看完战国时代','The Warring States, in nine hours'] } ],
  '秦': [ { b:'BV1gx4y1P7M9', t:['秦并天下:始皇的权力暗战','How Qin swallowed the world'] } ],
  '三国': [ { b:'BV1nQ4y1H7Eb', t:['三国归晋','Three Kingdoms become Jin'] } ],
  '五代十国': [ { b:'BV1oa411F77o', t:['十小时还原五代十国','The Five Dynasties, in ten hours'] } ],
  // 一分钟讲史。短链 b23.tv/pGp8G31 解析得,标题与 UP 主当场核实
  '西汉': [
    { b:'BV1SV411K7eW', t:['一口气看完西汉 210 年','Western Han in one sitting'] },
    { b:'BV1Hs4y1Q7M4', t:['鸿门宴:项羽为何不杀刘邦','The Hongmen banquet'] },
    { b:'BV14myuB7EPv', t:['王莽:汉祚何绝','Wang Mang\'s strange empire'] },
  ],
  // 以下均为 UP 主「安州牧」(UID 7481602,255 万粉、2023 百大),标题逐条核实。
  // 唐的跨度 618—907 太长,他没有单个视频通讲,故按三个阶段各给一个入口。
  '唐': [
    { b:'BV1na4y1V7so', t:['大唐创业:晋阳起兵到玄武门','The founding of Tang'] },
    { b:'BV1cE9mYyEgG', t:['从初唐走向盛唐:八年四场政变','Four coups in eight years'] },
    { b:'BV1Rs57zFEfW', t:['还原一个不一样的武则天','Wu Zetian, reconsidered'] },
    { b:'BV1QP4iz6EDA', t:['安史之乱:盛世掘墓人','An Lushan: the gravedigger'] },
    { b:'BV1Hj41187V4', t:['安史之乱名将篇:郭子仪','Guo Ziyi, pillar of the Tang'] },
  ],
  // 御史房(非安州牧,出现在相关推荐里),228 分钟完整合集,已核实
  '东汉': [
    { b:'BV1cK4y1W77n', t:['汉末风云:大汉亡了','How the Han fell'] },
    { b:'BV1Z24y1K7nX', t:['一个视频看懂汉朝四百年','Four Han centuries in one video'] },
  ],
  '隋': [ { b:'BV1cB4y1E7vU', t:['一口气看懂隋朝的兴盛与衰亡','The rise and fall of Sui'] } ],
  /* 思维实验室的"宋"三部曲讲的是整个两宋(制度、经济、军事、民变),不按北宋/南宋
     分界,故两条色带各挂全套:上=为何富裕却挨打,中=北宋之亡,下=为何民变不成革命。 */
  '北宋': [
    { b:'BV1kt4y1J7LH', t:['宋有多富裕,又为何这么惨(上)','How rich, and how badly it fared (1)'] },
    { b:'BV1HG41157Ba', t:['北宋是怎么亡的(中)','How the Northern Song fell (2)'] },
    { b:'BV1m6x1eYEks', t:['苏轼的璀璨一生','The life of Su Shi'] },
  ],
  '南宋': [
    { b:'BV1wd4y167AF', t:['为何民变不成革命(下)','Why the revolts never became revolution (3)'] },
    { b:'BV1kt4y1J7LH', t:['宋有多富裕,又为何这么惨(上)','How rich, and how badly it fared (1)'] },
  ],
  // 带你看历史。元朝取"98年"那版(1271-1368,与色带一致);"162年从成吉思汗起"
  // 那版跨到蒙古帝国,故挂到蒙古帝国那条色带上
  '元': [
    { b:'BV1FBTEzRESa', t:['16 分钟看完元朝 98 年','The Yuan in 16 minutes'] },
    { b:'BV18RxyeNEZ8', t:['十小时看完元末乱世','The Yuan collapse, in ten hours'] },
  ],
  // 徐大寿,Ray 提供
  '明': [
    { b:'BV1pz421o7Ye', t:['大明十六帝','The sixteen Ming emperors'] },
    { b:'BV1qLkZYTEUD', t:['朱元璋:千古逆袭第一人','Zhu Yuanzhang, the great underdog'] },
  ],
  // 带你看历史,Ray 提供(替换掉此前我自己从相关推荐里找的那条)
  '清': [
    { b:'BV1pa4y137H7', t:['一口气看完清朝 276 年','The Qing in one sitting'] },
    { b:'BV13u41117r8', t:['九子夺嫡:雍正怎么赢的','How Yongzheng won the throne'] },
    { b:'BV1yV411G7Lx', t:['兆惠平回:乾隆收复新疆','Qianlong retakes Xinjiang'] },
  ],
  /* 以下三条按 Ray 要求补英文片源,均经 YouTube oEmbed 核实频道与标题。
     蒙古帝国同时给了 B 站版(带你看历史,162年从成吉思汗讲起),中文界面用 B 站、
     英文界面用 YouTube——渲染逻辑会按语言自动挑。 */
  '罗马帝国': [ { y:'PV3r6BINlsM', t:['44 分钟看完罗马史(英)','The Entire History of Rome in 44 Minutes'] },
    { b:'BV1wX6mY5Env', t:['20 小时一口气看完罗马帝国史','The Roman Empire in 20 hours'] } ],
  '阿拉伯哈里发': [ { y:'O8hhwSn1iaU', t:['阿拔斯:伊斯兰黄金时代(英)',"The Abbasids: Islam's Golden Age"] } ],
  '蒙古帝国': [ { b:'BV1N14y1M72V', y:'bzatw32j-i4', t:['蒙古帝国 162 年','Mongols: from Genghis to Kublai'] },
    { b:'BV1bu4y1w7Ew', t:['蒙古帝国(上)','The Mongol Empire, part 1'] } ],
  '南北朝': [ { b:'BV1w3411v7jd', t:['一口气看完 170 年的乱世南北朝','170 years of division'] } ],
  '东晋·十六国': [ { b:'BV1N7411M7wA', t:['两晋十六国:后三国时代 174 年','Jin and the Sixteen Kingdoms'] } ],
  /* ---- 2026-08-15 Ray 第二批(v210):每条经 B 站公开接口核实标题 / UP 主 / 播放量(均百万级或接近)。
     单里另有两条「世界通史」公开课(71h / 146h)——没有对应色带、也不是给 7 岁看的,不入表;
     「维京」那条(狼群与长船)等维京·北欧色带建起来再挂。 ---- */
  '古埃及': [ { b:'BV1GV411p79Y', t:['一口气看完古埃及的历史','Ancient Egypt in one sitting'] } ],
  '罗马共和国': [ { b:'BV1wd4y1h7pP', t:['罗马史合集:从城邦到帝国','Rome: from city-state to empire'] } ],
  '波斯(阿契美尼德)': [
    { b:'BV1Sf4y167yD', t:['一个视频看懂波斯崛起','The rise of Persia in one video'] },
    { b:'BV19o4y1D71a', t:['一口气看完伊朗(波斯)的历史','Iran (Persia) in one sitting'] },
  ],
  '帕提亚·萨珊': [ { b:'BV19o4y1D71a', t:['一口气看完伊朗(波斯)的历史','Iran (Persia) in one sitting'] } ],
  '萨法维·波斯': [ { b:'BV19o4y1D71a', t:['一口气看完伊朗(波斯)的历史','Iran (Persia) in one sitting'] } ],
  '古代日本': [ { b:'BV1qP4y1J7iw', t:['一口气看完日本历史','Japanese history in one sitting'] } ],
  '幕府时代': [ { b:'BV1qP4y1J7iw', t:['一口气看完日本历史','Japanese history in one sitting'] } ],
  '江户日本': [ { b:'BV1qP4y1J7iw', t:['一口气看完日本历史','Japanese history in one sitting'] } ],
  '近现代日本': [ { b:'BV1qP4y1J7iw', t:['一口气看完日本历史','Japanese history in one sitting'] } ],
  '大英帝国·英国': [ { b:'BV1TQ4y1n7kK', t:['英国:从边缘岛国到世界霸主再到退缩','Britain: island, empire, and after'] } ],
  '中世纪西欧': [ { b:'BV1ip411Z7yG', t:['纪录片:英国玫瑰战争','Documentary: the Wars of the Roses'] } ],
  '莫卧儿帝国': [ { b:'BV1th4y1T7q2', t:['一口气看完《莫卧儿帝国》','The Mughal Empire in one sitting'] } ],
  '奥斯曼帝国': [ { b:'BV1Qt411d7SR', t:['土耳其见闻:奥斯曼帝国的崛起与没落(上)','The Ottomans: rise and fall, part 1'] } ],
  '古希腊': [ { b:'BV1As411m7U2', t:['奥林匹斯星传(古希腊神话动画)','Olympus Guardian (Greek myth animation)'] } ],
  '维京·北欧': [ { b:'BV1FE4m1d7hM', t:['狼群与长船:维京人的战争文化','Wolves and longships: how the Vikings fought'] } ],   // v212,Ray 单里的那条
};
