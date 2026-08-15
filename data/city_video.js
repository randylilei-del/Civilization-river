/* 城市介绍视频(v177,Ray 提议):地理视角选中某座城时,在城市名下方给视频入口——
   「这座城的前世今生」。键 = GEO_CITY 的中文城市名(audit 规则 53 拦孤儿键与结构),
   值与 VIDEO 表同构:[{ b:BV号, y?:YouTube ID, t:[zh,en] }],可多条。
   ⚠ 与 VIDEO 同一条铁律:**只填人工核实过的链接,绝不可凭印象生成 ID**。
   表可以为空——没条目的城市什么都不渲染,不出空按钮。

   v185 首批 11 条(Ray 提供片单):2026-08-15 逐条走 bilibili view API 核实
   (code=0、标题与片名相符、分 P 数记录在案)。片名取纪录片正式名,
   不抄搬运者标题里的「【1080P】【全X集】」等前缀。
   ⚠ 这批全部是搬运稿件而非官方号,存在被下架的可能——链接失效时整条删掉,
   不要留死链给孩子点。 */
const CITY_VIDEO = {
  '西安': [
    { b: 'BV1jW411C7DD', t: ['望长安（10 集）', 'Gazing at Chang\'an (10 eps)'] },
    { b: 'BV1A44y1b7Lt', t: ['大明宫（6 集）', 'Daming Palace (6 eps)'] },
    { b: 'BV1aX4y1w7DB', t: ['西汉帝陵（12 集）', 'Imperial Tombs of the Western Han (12 eps)'] },
  ],
  '北京': [
    { b: 'BV1vs41147ib', t: ['故宫「看门人」探访紫禁城未开放区', 'The Forbidden City\'s Gatekeeper: Behind the Closed Doors'] },
  ],
  '洛阳': [
    { b: 'BV1Hs411d7zA', t: ['天地洛阳（9 集）', 'Luoyang Between Heaven and Earth (9 eps)'] },
  ],
  '开封': [
    { b: 'BV1xW411e7ha', t: ['追寻宋金时代的别样生活（4 集）', 'Everyday Life in the Song and Jin Era (4 eps)'] },
  ],
  '杭州': [
    { b: 'BV1NW411Z77Y', t: ['西湖（11 集）', 'West Lake (11 eps)'] },
    { b: 'BV1Sb411m7zU', t: ['南宋（8 集）', 'The Southern Song (8 eps)'] },
  ],
  '敦煌': [
    { b: 'BV1Gx411T7sF', t: ['敦煌（10 集）', 'Dunhuang (10 eps)'] },
    { b: 'BV19x411y7mt', t: ['莫高窟·美的全貌（NHK，2 集）', 'Mogao Caves: The Whole of Its Beauty (NHK, 2 eps)'] },
  ],
  '泉州': [
    { b: 'BV17Z4y137qB', t: ['重返刺桐城（3 集）', 'Return to Zayton (3 eps)'] },
  ],
};
