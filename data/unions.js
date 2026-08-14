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
      'Twenty of the 27 members use the euro. The Schengen area is not the same list as the EU: Norway and Switzerland are in Schengen but not the EU, and Ireland is the other way round.'] },
{ id:'asean', l:'se', a:1967, b:2025, g:'◎',
  n:['东盟','ASEAN'], s:['东盟','ASEAN'], w:['东南亚国家联盟','ASEAN'],
  /* ☠ 写这条时最容易犯的错：把东盟当成「亚洲的欧盟」。它没有共同货币、没有超国家法院，
     而且明确不建——「协商一致、不干涉内政」本身就是它的设计，不是它还没做到。 */
  d:['它们不合并成一个国家，也不设一个能命令大家的机构——有事坐下来商量，商量不成就先放着。',
     'They do not merge into one country, and set up no body that can give orders: they sit down and talk, and what they cannot agree on, they leave.'],
  k:[[1967,['五个国家在曼谷签下宣言','Five countries sign the Bangkok Declaration']],
     [1995,['越南加入——冷战时的对手坐到了同一张桌子前','Vietnam joins: a cold-war opponent takes a seat at the same table']],
     [1999,['柬埔寨加入，十国到齐','Cambodia joins, completing the ten']],
     [2015,['宣布成立东盟共同体','The ASEAN Community is declared']]],
  f:[['印度尼西亚','Indonesia'],['马来西亚','Malaysia'],['菲律宾','the Philippines'],
     ['新加坡','Singapore'],['泰国','Thailand']],
  m:[['文莱','Brunei'],['柬埔寨','Cambodia'],['印度尼西亚','Indonesia'],['老挝','Laos'],
     ['马来西亚','Malaysia'],['缅甸','Myanmar'],['菲律宾','the Philippines'],['新加坡','Singapore'],
     ['泰国','Thailand'],['越南','Vietnam']],
  x:[],
  nt:['它的做法常被叫作「东盟方式」：协商一致、不干涉内政。没有共同货币，也没有超国家法院——和欧盟不是一回事。东帝汶是最新的加入者，本站暂按十国计，这一条待核。',
      'Its way of working is often called the ASEAN Way: consensus, and no interference in one another. There is no common currency and no supranational court, so it is not the same thing as the EU. Timor-Leste is the newest entrant; this site counts ten for now, and that line needs checking.'] },
{ id:'au', l:'af', a:1963, b:2025, g:'◎',
  n:['非盟','the African Union'], s:['非盟','AU'], w:['非洲联盟','African Union'],
  /* 和欧盟、东盟的差别值得写清楚:欧盟的名单是「那些图上没有色带的国家还在」,
     非盟的名单也是同一件事(「现代非洲」是一整条色带,55 个国家一个名字都没露)。
     但它多一层:总部在亚的斯亚贝巴——非洲仅有的两个未被长期殖民的国家之一,选址本身是一句话。 */
  d:['非洲几乎所有国家都在里面。它管的是大家一起说定的事,各国还是各国。',
     'Almost every country in Africa is in it. It handles what they agree together; each country stays its own.'],
  k:[[1963,['三十二个国家在亚的斯亚贝巴签下宪章,成立非洲统一组织','Thirty-two countries sign the charter in Addis Ababa, founding the OAU']],
     [1984,['摩洛哥退出——因为西撒哈拉被接纳为成员','Morocco leaves, because Western Sahara was admitted']],
     [2002,['改组成非洲联盟','It is reorganised as the African Union']],
     [2017,['摩洛哥重新加入','Morocco rejoins']],
     [2021,['非洲大陆自由贸易区开始贸易','The African Continental Free Trade Area starts trading']]],
  fd:['1963 年,三十二个国家在亚的斯亚贝巴签下宪章','In 1963, thirty-two countries signed the charter in Addis Ababa'],
  m:[
     ['阿尔及利亚','Algeria'],['安哥拉','Angola'],['贝宁','Benin'],['博茨瓦纳','Botswana'],
     ['布基纳法索','Burkina Faso'],['布隆迪','Burundi'],['佛得角','Cabo Verde'],['喀麦隆','Cameroon'],
     ['中非','the Central African Republic'],['乍得','Chad'],['科摩罗','the Comoros'],['刚果(布)','the Republic of the Congo'],
     ['科特迪瓦','Côte d\'Ivoire'],['刚果(金)','the Democratic Republic of the Congo'],['吉布提','Djibouti'],['埃及','Egypt'],
     ['赤道几内亚','Equatorial Guinea'],['厄立特里亚','Eritrea'],['埃斯瓦蒂尼','Eswatini'],['埃塞俄比亚','Ethiopia'],
     ['加蓬','Gabon'],['冈比亚','the Gambia'],['加纳','Ghana'],['几内亚','Guinea'],
     ['几内亚比绍','Guinea-Bissau'],['肯尼亚','Kenya'],['莱索托','Lesotho'],['利比里亚','Liberia'],
     ['利比亚','Libya'],['马达加斯加','Madagascar'],['马拉维','Malawi'],['马里','Mali'],
     ['毛里塔尼亚','Mauritania'],['毛里求斯','Mauritius'],['摩洛哥','Morocco'],['莫桑比克','Mozambique'],
     ['纳米比亚','Namibia'],['尼日尔','Niger'],['尼日利亚','Nigeria'],['卢旺达','Rwanda'],
     ['撒哈拉阿拉伯民主共和国','the Sahrawi Arab Democratic Republic'],['圣多美和普林西比','São Tomé and Príncipe'],['塞内加尔','Senegal'],['塞舌尔','Seychelles'],
     ['塞拉利昂','Sierra Leone'],['索马里','Somalia'],['南非','South Africa'],['南苏丹','South Sudan'],
     ['苏丹','Sudan'],['坦桑尼亚','Tanzania'],['多哥','Togo'],['突尼斯','Tunisia'],
     ['乌干达','Uganda'],['赞比亚','Zambia'],['津巴布韦','Zimbabwe']],
  x:[],
  nt:['总部设在亚的斯亚贝巴——埃塞俄比亚是非洲仅有的两个未被长期殖民的国家之一,这个选址本身就是一句话。成员里的撒哈拉阿拉伯民主共和国(西撒哈拉)地位有争议,摩洛哥曾因此退出、2017 年才重新加入。发生政变的国家会被暂停成员资格,那不等于退出,名单里仍然计入。',
      'It is based in Addis Ababa, one of only two African countries never long colonised, and the choice of seat is itself a statement. One member, the Sahrawi Arab Democratic Republic, has a contested status; Morocco left over it and only rejoined in 2017. Countries that have had coups are suspended rather than removed, and are still counted here.'] }
];
