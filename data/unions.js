/* ---------- UNIONS 共同体(v143):一群仍然存在的国家自愿把一部分主权交上去 ----------
   为什么它既不是色带也不是事件(这一段是设计的全部理由,别丢):
   · 不是色带 —— 色带 = 一个政权在时间里的兴衰。欧盟不是一个国家,画成色带会和
     英法德俄四条并排叠着,被读成「欧洲又多了一个国家」,正好教错;而且英国 2020 年
     退出了,色带表达不了「进去又出来」。
   · 不是事件 —— 事件是一个时间点,共同体是一段持续的结构。
   · **它的价值不在把已有色带框起来,而在说出那些图上没有色带的国家还在。**
     1957—2025 的欧洲泳道上只有法兰西、德意志、大英帝国·英国、俄罗斯·苏联四条,
     其中只有前两条是欧盟成员——所以成员名单不是附属信息,是这个功能的正文。
   目前只有欧盟一条(原型)。为什么只做欧盟/东盟/非盟三个、以及筛选尺子(主权让渡的
   深度),见 docs/IDEAS.md 的 002。

   字段:l=所在泳道 a/b=起止年 g=图标 n=全名 s=图上短标签 w=维基消歧名
        d=一句话 k=关键年份 f=创始成员 m=现有成员 x=已退出 nt=口径说明 */
const UNIONS = [
{ id:'eu', l:'eu', a:1957, b:2025, g:'◎',
  n:['欧盟','the European Union'], s:['欧盟','EU'], w:['欧洲联盟','European Union'],
  /* ⚠ 措辞校准过一次:初稿写「钱也用同一种」是错的——27 个成员里只有 20 个用欧元。
     给孩子的话可以短,但不能把「大部分」说成「都」。 */
  d:['它们还是各自的国家,只是很多事情一起决定,大部分成员还用同一种钱。',
     'They are still separate countries; they simply decide many things together, and most of them share one currency.'],
  k:[[1957,['六个国家签下罗马条约,先把生意合成一个市场','Six countries sign the Treaty of Rome and merge their markets']],
     [1993,['从这一年起,它才开始叫「欧盟」','Only from this year is it called the European Union']],
     [2002,['欧元的纸币和硬币开始流通','Euro notes and coins go into circulation']],
     [2020,['英国离开','the United Kingdom leaves']]],
  f:[['比利时','Belgium'],['法国','France'],['意大利','Italy'],['卢森堡','Luxembourg'],
     ['荷兰','the Netherlands'],['西德','West Germany']],
  m:[['奥地利','Austria'],['比利时','Belgium'],['保加利亚','Bulgaria'],['克罗地亚','Croatia'],
     ['塞浦路斯','Cyprus'],['捷克','Czechia'],['丹麦','Denmark'],['爱沙尼亚','Estonia'],
     ['芬兰','Finland'],['法国','France'],['德国','Germany'],['希腊','Greece'],
     ['匈牙利','Hungary'],['爱尔兰','Ireland'],['意大利','Italy'],['拉脱维亚','Latvia'],
     ['立陶宛','Lithuania'],['卢森堡','Luxembourg'],['马耳他','Malta'],['荷兰','the Netherlands'],
     ['波兰','Poland'],['葡萄牙','Portugal'],['罗马尼亚','Romania'],['斯洛伐克','Slovakia'],
     ['斯洛文尼亚','Slovenia'],['西班牙','Spain'],['瑞典','Sweden']],
  x:[[['英国','the United Kingdom'],2020]],
  nt:['27 个成员国里,20 个使用欧元。「人员自由流动」的申根区和欧盟不是同一份名单——挪威、瑞士在申根不在欧盟,爱尔兰在欧盟不在申根。',
      'Twenty of the 27 members use the euro. The Schengen area is not the same list as the EU: Norway and Switzerland are in Schengen but not the EU, and Ireland is the other way round.'] }
];
