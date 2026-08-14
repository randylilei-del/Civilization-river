/* 搜索别名表(v152,IDEAS 001 层一)——孩子嘴里的词 → 站内文明。
   目的:堵「知道了才查得到」的死循环(他知道「奥德赛」,不知道它属于迈锡尼时代)。
   纪律:
   - c 必须是 data/civs.js 里存在的 n(audit 规则 52 拦);
   - why 双语各一句,写成**给孩子的回答**,不是注释——搜索结果里直接显示这句;
   - 同一个词只许出现在一条里(规则 52 拦重复);英文词一律小写,匹配时统一 lowercase;
   - 全文已能命中且落点分散得当的词(金字塔→四个文明、奥运会、特洛伊)**不建别名**,
     别名只救零命中或落点跑偏的词;
   - 新词来源:localStorage `whviz-sq` 里攒的真实搜索记录(零命中的那些就是下一批别名)。 */
const SEARCH_ALIAS = [
  { t:['奥德赛','木马屠城','特洛伊木马','odyssey','troy','trojan horse','trojan war'], c:'米诺斯·迈锡尼',
    why:['《奥德赛》和木马屠城讲的都是特洛伊战争——传说就发生在这个时代','The Odyssey and the Trojan Horse both come from the Trojan War, set in this age'] },
  { t:['宙斯','奥林匹斯','希腊神话','zeus','olympus','greek gods'], c:'古希腊',
    why:['宙斯是古希腊神话的主神,住在奥林匹斯山','Zeus, king of the ancient Greek gods, lives on Mount Olympus'] },
  { t:['木乃伊','法老','狮身人面像','mummy','pharaoh','sphinx'], c:'古埃及',
    why:['木乃伊、法老和狮身人面像都来自古埃及','Mummies, pharaohs and the Sphinx all come from Ancient Egypt'] },
  { t:['一千零一夜','阿拉丁','辛巴达','aladdin','arabian nights','sinbad'], c:'阿拉伯哈里发',
    why:['《一千零一夜》的故事发生在哈里发时代的巴格达','The Arabian Nights tales are set in Baghdad under the Caliphate'] },
  { t:['孙悟空','西游记','monkey king','journey to the west'], c:'唐',
    why:['《西游记》是从唐朝玄奘取经的真实旅程里长出来的','Journey to the West grew out of the real journey of the Tang monk Xuanzang'] },
  { t:['花木兰','木兰','mulan'], c:'南北朝',
    why:['木兰从军的故事背景是南北朝时期的北朝','The ballad of Mulan is set in the Northern Dynasties of this era'] },
  { t:['泰姬陵','taj mahal'], c:'莫卧儿帝国',
    why:['泰姬陵是莫卧儿皇帝沙贾汗为皇后修的陵墓','The Taj Mahal is the tomb a Mughal emperor built for his empress'] },
  { t:['兵马俑','terracotta army','terracotta'], c:'秦',
    why:['兵马俑是秦始皇陵的陪葬军团','The Terracotta Army guards the tomb of the First Emperor of Qin'] },
  { t:['长城','万里长城','great wall'], c:'明',
    why:['今天看到的长城大多是明朝修的;最早把各国的墙连起来的是秦','Most of the Great Wall you see today is Ming work; Qin first linked the earlier walls'] },
  { t:['角斗士','斗兽场','竞技场','gladiator','colosseum'], c:'罗马帝国',
    why:['角斗士在罗马帝国的斗兽场里搏斗,最大的一座能坐五万人','Gladiators fought in Roman arenas; the Colosseum held some fifty thousand people'] },
];
