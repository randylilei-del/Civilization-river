/* ---------- 纪录片:人工策展 ----------
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
  // 一分钟讲史。短链 b23.tv/pGp8G31 解析得,标题与 UP 主当场核实
  '西汉': [ { b:'BV1SV411K7eW', t:['一口气看完西汉 210 年','Western Han in one sitting'] } ],
  // 以下均为 UP 主「安州牧」(UID 7481602,255 万粉、2023 百大),标题逐条核实。
  // 唐的跨度 618—907 太长,他没有单个视频通讲,故按三个阶段各给一个入口。
  '唐': [
    { b:'BV1na4y1V7so', t:['大唐创业:晋阳起兵到玄武门','The founding of Tang'] },
    { b:'BV1cE9mYyEgG', t:['从初唐走向盛唐:八年四场政变','Four coups in eight years'] },
    { b:'BV1QP4iz6EDA', t:['安史之乱:盛世掘墓人','An Lushan: the gravedigger'] },
  ],
  // 御史房(非安州牧,出现在相关推荐里),228 分钟完整合集,已核实
  '东汉': [ { b:'BV1cK4y1W77n', t:['汉末风云:大汉亡了','How the Han fell'] } ],
  '隋': [ { b:'BV1cB4y1E7vU', t:['一口气看懂隋朝的兴盛与衰亡','The rise and fall of Sui'] } ],
  /* 思维实验室的"宋"三部曲讲的是整个两宋(制度、经济、军事、民变),不按北宋/南宋
     分界,故两条色带各挂全套:上=为何富裕却挨打,中=北宋之亡,下=为何民变不成革命。 */
  '北宋': [
    { b:'BV1kt4y1J7LH', t:['宋有多富裕,又为何这么惨(上)','How rich, and how badly it fared (1)'] },
    { b:'BV1HG41157Ba', t:['北宋是怎么亡的(中)','How the Northern Song fell (2)'] },
  ],
  '南宋': [
    { b:'BV1wd4y167AF', t:['为何民变不成革命(下)','Why the revolts never became revolution (3)'] },
    { b:'BV1kt4y1J7LH', t:['宋有多富裕,又为何这么惨(上)','How rich, and how badly it fared (1)'] },
  ],
  // 带你看历史。元朝取"98年"那版(1271-1368,与色带一致);"162年从成吉思汗起"
  // 那版跨到蒙古帝国,故挂到蒙古帝国那条色带上
  '元': [ { b:'BV1FBTEzRESa', t:['16 分钟看完元朝 98 年','The Yuan in 16 minutes'] } ],
  // 徐大寿,Ray 提供
  '明': [ { b:'BV1pz421o7Ye', t:['大明十六帝','The sixteen Ming emperors'] } ],
  // 带你看历史,Ray 提供(替换掉此前我自己从相关推荐里找的那条)
  '清': [ { b:'BV1pa4y137H7', t:['一口气看完清朝 276 年','The Qing in one sitting'] } ],
  /* 以下三条按 Ray 要求补英文片源,均经 YouTube oEmbed 核实频道与标题。
     蒙古帝国同时给了 B 站版(带你看历史,162年从成吉思汗讲起),中文界面用 B 站、
     英文界面用 YouTube——渲染逻辑会按语言自动挑。 */
  '罗马帝国': [ { y:'PV3r6BINlsM', t:['44 分钟看完罗马史(英)','The Entire History of Rome in 44 Minutes'] } ],
  '阿拉伯哈里发': [ { y:'O8hhwSn1iaU', t:['阿拔斯:伊斯兰黄金时代(英)',"The Abbasids: Islam's Golden Age"] } ],
  '蒙古帝国': [ { b:'BV1N14y1M72V', y:'bzatw32j-i4', t:['蒙古帝国 162 年','Mongols: from Genghis to Kublai'] } ],
  '南北朝': [ { b:'BV1w3411v7jd', t:['一口气看完 170 年的乱世南北朝','170 years of division'] } ],
  '东晋·十六国': [ { b:'BV1N7411M7wA', t:['两晋十六国:后三国时代 174 年','Jin and the Sixteen Kingdoms'] } ],
};
