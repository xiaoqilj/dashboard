var DATA = {
    // 公司 = institution
    institutions: [
        // ========== 第一梯队：已上市/IP进程中 ==========
        { id: 'lantiq', name: '澜起科技', type: '上市公司（科创板）', location: '上海', tek: 4, desc: '2004年成立，市值3000亿。DDR2/3/4/5内存接口芯片全球龙头，PCIe/CXL互连芯片，时钟芯片。杨崇和创始人' },
        { id: 'verisilicon', name: '芯原微电子', type: '上市公司（科创板）', location: '上海', tek: 3, desc: '2001年成立，中国第一设计服务公司。ADC/DAC、PLL、LVDS/PCIe/USB3.0/MIPI D/C PHY、Power Management IP' },
        { id: 'chancore', name: '灿芯半导体', type: '上市公司（科创板）', location: '上海', tek: 3, desc: '2008年成立，2.5-32Gbps SerDes，DDR/USB/PCIe/ONFI IP。庄志青创始人' },
        { id: 'zqte', name: '中际旭创', type: '上市公司（深交所）', location: '苏州', tek: 5, desc: '2005年成立，2025年净利108亿。光通信模块龙头，订单排到明年Q1。CPO/LPO核心光模块供应商' },
        { id: 'lianyun', name: '联芸科技', type: '上市公司（科创板）', location: '杭州', tek: 3, desc: '2014年成立，以太网PHY芯片，方小玲创始人。存储主控+PHY双轮驱动' },
        { id: 'longxun', name: '龙迅半导体', type: '上市公司', location: '合肥', tek: 3, desc: '高速接口芯片：DP/eDP/eDPx、USB/Type-C、MIPI/LVDS、Repeater/Retimer、车载SerDes、光收发模块' },

        // ========== 第二梯队：高速112G+ SerDes IP ==========
        { id: 'niuke', name: '牛芯科技', type: '高速SerDes IP', location: '深圳', tek: 5, desc: '2020年成立，C+轮。112G/64G Combo SerDes、PCIe 6.0/5.0/4.0、Rapid IO 4.0、JESD204B/204C、USB3.1、LVDS、MIPI C/D PHY。DDR3/4/5 IP。**2026年2月启动A股上市辅导**' },
        { id: 'orangechip', name: '橙科微电子', type: '高速SerDes IP', location: '上海闵行', tek: 5, desc: '2017年成立，D++轮。56G/112G SerDes，光模块DSP。创始人王珲（中科大+美国南加大博士，原Broadcom首席科学家）' },
        { id: 'taorun', name: '韬润半导体', type: '高速SerDes IP', location: '上海→北京', tek: 4, desc: '2015年成立，D轮。56G/112G SerDes，高性能ADC/DAC。2026年4月迁址北京' },
        { id: 'innosilicon', name: '芯动科技', type: '全栈IP厂商', location: '北京', tek: 5, desc: '2007年成立。最全IP组合：**GDDR7 PHY/Controller、HBM3E/4、LPDDR6/5X、UCIe Chiplet(INNOLINK™)、112G/56G/32G SerDes、PCIe 6.0/CXL 3.0**、多媒体接口(HDMI2.1/DP/eDP)、专用IP等' },
        { id: 'shenglianke', name: '晟联科', type: '高速SerDes IP', location: '上海浦东', tek: 4, desc: '2022年成立，C轮。112G PAM4 SerDes、PCIe 6.0/5.0、16G D2D、IO Die、车载4~24G SerDes、DSP' },
        { id: 'zhongyin', name: '中茵微电子', type: '高速SerDes IP', location: '上海', tek: 4, desc: '2021年成立，C轮。PCIe 5.0 PHY、112G SerDes、LPDDR5x、HBM3E PHY。创始人王洪鹏清华本硕。**2026年3月递表港交所**' },
        { id: 'yuanqi', name: '元启半导体', type: '高速SerDes IP', location: '杭州', tek: 3, desc: '2023年成立，A轮。高速oDSP、112G SerDes IP。最年轻玩家' },
        { id: 'kuixin', name: '奎芯科技', type: '高速接口IP', location: '上海闵行', tek: 3, desc: '2021年成立，A轮。HBM3、UCIe、LPDDR5X、PCIe、USB、ONFI、SerDes、Chiplet。团队来自智原/联发科/瑞昱。2025年11月和顺石油拟5.4亿并购' },

        // ========== 第三梯队：通用IP/其他 ==========
        { id: 'xinyaohui', name: '芯耀辉', type: '高速接口IP', location: '上海', tek: 3, desc: '2020年成立，B轮。DDR/PCIe/SerDes/高速接口。曾克强创始人（原Synopsys上海总经理）' },
        { id: 'xinchuliu', name: '芯潮流', type: '高速SerDes IP', location: '珠海', tek: 3, desc: '2021年成立，A轮。高速SerDes IP，珠海/澳门背景' },
        { id: 'ruicheng', name: '锐成芯微', type: 'IP厂商', location: '—', tek: 2, desc: '2011年成立，IPO申报完成。USB2.0/1.1、MIPI D-PHY、SerDes IP' },
        { id: 'hexin', name: '核芯互联', type: 'IP厂商', location: '北京', tek: 2, desc: '2017年成立，C轮。1-28Gbps SerDes IP、数据转换器、时钟IP、MCU IP。胡康桥创始人（清华+莱斯）' },
        { id: 'fangcheng', name: '钫铖微电子/集益威', type: '高速混合信号', location: '上海', tek: 2, desc: '2015年成立，C轮。16nm 56G PAM4 SerDes、32G 7b ADC、28G低抖动PLL。LEE SEUNG CHUL创始人' },
        { id: 'gaoyun', name: '高云半导体', type: 'FPGA+IP', location: '广州', tek: 2, desc: '2014年成立，B轮。FPGA+接口IP：SDI、SLVS-EC RX、MIPI D-PHY/C-PHY。国产FPGA重点企业' },
        { id: 'guangzi', name: '光梓信息', type: '光通信芯片', location: '上海', tek: 3, desc: '2015年成立，D轮以上。400G PAM4光通信芯片、4x25Gbps VCSEL Driver/TIA。Patrick Chiang（姜培）创始人' },

        // ========== 第四梯队：车载SerDes ==========
        { id: 'kangzhi', name: '慷智集成', type: '车载SerDes', location: '上海', tek: 3, desc: '2017年成立，C轮。智能车载高清视频传输SERDES芯片。刘文军创始人（前海思美国IC Lab首席多媒体科学家）。⚠️ 2025年内部有欠薪传闻' },
        { id: 'ruifaka', name: '瑞发科', type: '车载SerDes', location: '天津', tek: 4, desc: '2009年成立，D轮以上。HSMT车载SerDes芯片、音视频高速接口芯片、AVT高速SerDes。**2026年初启动IPO**' },
        { id: 'renxin', name: '仁芯科技', type: '车载SerDes', location: '南京', tek: 3, desc: '2022年成立，A轮。R-LinC系列车载SerDes：16Gbps Camera SerDes、32Gbps Display SerDes。党伟光创始人（诺基亚/高通/新思背景）' },
        { id: 'aixince', name: '艾芯泽微电子', type: '车载SerDes', location: '无锡', tek: 2, desc: '2023年成立。车载SerDes芯片。杰华特老板投资/成立，可能被杰华特并购' },
        { id: 'jinglue', name: '景略半导体', type: '车载网络PHY', location: '上海', tek: 3, desc: '2009年成立，D轮。PHY接口、SerDes ASA。创始人何润生（上交+Marvell背景）。控股股东南京金阵微电子' },
        { id: 'langtianmu', name: '朗田亩半导体', type: '高速接口芯片', location: '深圳', tek: 2, desc: '2013年成立。DP/eDP、USB/Type-C、MIPI/LVDS、Repeater/Retimer、光收发模块、车载SerDes。龙迅全资子公司' },

        // ========== 其他 ==========
        { id: 'wangxun', name: '网迅科技', type: '以太网控制器', location: '北京', tek: 2, desc: '2014年成立，B轮。网络控制器芯片、100G/25G/10G以太网控制器IP' },
    ],

    // 团队 = researcher
    teams: [
        // ————— 澜起科技 —————
        { id: 'yang_chonghe', name: '杨崇和', comp: 'lantiq', role: '创始人/董事长', product: 'DDR5内存接口芯片', tech: ['DDR', 'PCIe', '时钟芯片'] },
        { id: 'dai_guanghui', name: '戴光辉', comp: 'lantiq', role: '联合创始人', product: 'DDR5内存接口芯片', tech: ['DDR'] },
        { id: 'shan_gang', name: '山岗', comp: 'lantiq', role: '副总经理', product: 'DDR内存接口芯片研发（20年+经验）', tech: ['DDR'] },
        { id: 'liang_bogu', name: '梁铂钴', comp: 'lantiq', role: '副总经理', product: 'PCIe/CXL互连芯片', tech: ['PCIe', 'CXL'], note: '前Cadence研发经理' },

        // ————— 芯原微电子 —————
        { id: 'dai_weimin', name: '戴伟民', comp: 'verisilicon', role: '创始人/董事长/CEO', product: '平台化芯片设计服务', tech: ['SoC'] },
        { id: 'dai_weijin', name: '戴伟进', comp: 'verisilicon', role: '首席战略官/IP事业部总经理', product: '高速接口IP', tech: ['IP设计'] },
        { id: 'wang_yang', name: '汪洋', comp: 'verisilicon', role: '首席运营官/全球销售负责人', product: '定制芯片平台', tech: ['销售管理'] },

        // ————— 中际旭创 —————
        { id: 'wang_weixiu', name: '王伟修', comp: 'zqte', role: '创始人', product: '光通信模块', tech: ['光模块'] },
        { id: 'liu_sheng', name: '刘圣', comp: 'zqte', role: '董事长/总裁', product: '光模块/LPO/CPO', tech: ['光通信'], note: '清华+佐治亚理工，前朗讯/Opnext' },

        // ————— 牛芯科技 —————
        { id: 'luan_changhai', name: '栾昌海', comp: 'niuke', role: '创始人/董事长', product: '112G SerDes', tech: ['高速SerDes', '接口IP'] },
        { id: 'wang_donghui', name: '王冬辉', comp: 'niuke', role: '—', product: 'SerDes', tech: ['高速SerDes'], note: '曾任职奥令科/橙科微电子' },
        { id: 'chang_qing', name: '常青', comp: 'niuke', role: '市场总监', product: 'SerDes IP市场', tech: ['市场推广'] },

        // ————— 橙科微电子 —————
        { id: 'wang_hui', name: '王珲', comp: 'orangechip', role: '创始人/董事长', product: '112G SerDes/光模块DSP', tech: ['高速SerDes', 'DSP'], note: '中科大+美国南加大博士，原Broadcom首席科学家' },
        { id: 'pan_suyun', name: '潘苏云', comp: 'orangechip', role: '联合创始人', product: '对外合作与市场', tech: ['市场开拓'] },
        { id: 'wang_tao', name: '王涛', comp: 'orangechip', role: '模拟设计负责人', product: 'SerDes模拟设计', tech: ['模拟IC设计'] },

        // ————— 韬润半导体 —————
        { id: 'guan_yi', name: '管逸', comp: 'taorun', role: '创始人/董事长', product: '112G SerDes+ADC/DAC', tech: ['高速混合信号'] },
        { id: 'zhou_liren', name: '周立人', comp: 'taorun', role: '联合创始人/CTO', product: 'SerDes', tech: ['高速SerDes'] },
        { id: 'li_wenjie', name: '李闻界', comp: 'taorun', role: 'SerDes负责人', product: '56G/112G SerDes', tech: ['高速SerDes'], note: '原Marvell背景' },

        // ————— 芯动科技 —————
        { id: 'ao_hai', name: '敖海', comp: 'innosilicon', role: '创始人/董事长', product: 'GDDR7/HBM3E/112G SerDes', tech: ['高速接口', '存储PHY'], note: '前美光高级架构师' },
        { id: 'mao_mingming', name: '毛鸣明', comp: 'innosilicon', role: 'CTO/GPU总经理', product: 'GPU产品线', tech: ['GPU', 'IP'] },
        { id: 'gao_zhuan', name: '高专', comp: 'innosilicon', role: 'IP研发副总裁', product: '高速IP研发', tech: ['IP设计'] },

        // ————— 晟联科 —————
        { id: 'chan_kaikeung', name: 'CHAN KAI KEUNG(陈继强)', comp: 'shenglianke', role: '创始人', product: '112G PAM4 SerDes', tech: ['高速SerDes', 'PCIe'] },
        { id: 'xu_danfeng', name: '徐丹丰', comp: 'shenglianke', role: '联合创始人/模拟研发VP', product: '车载SerDes', tech: ['模拟IC', 'SerDes'] },

        // ————— 中茵微电子 —————
        { id: 'wang_hongpeng', name: '王洪鹏', comp: 'zhongyin', role: '创始人/董事长', product: '112G SerDes/PCIe 5.0', tech: ['高速接口'], note: '清华本硕' },
        { id: 'zhang_dongqing', name: '张冬青', comp: 'zhongyin', role: '联合创始人/总经理', product: '业务拓展/运营', tech: ['企业管理'], note: '清华毕业，王洪鹏配偶' },
        { id: 'lin_yun', name: '林云', comp: 'zhongyin', role: 'SerDes IP负责人', product: 'SerDes/DDR IP', tech: ['SerDes', 'DDR'], note: '东南大学本硕' },

        // ————— 奎芯科技 —————
        { id: 'chen_wanyi', name: '陈琬宜', comp: 'kuixin', role: '创始人/董事长', product: 'HBM3/UCIe/ONFI', tech: ['高速接口', 'Chiplet'] },
        { id: 'danny_huang', name: 'Danny Huang', comp: 'kuixin', role: 'IP技术主管', product: 'USB/PCIe IP', tech: ['USB', 'PCIe'], note: '原智原科技技术主管' },
        { id: 'roger_young', name: 'Roger Young', comp: 'kuixin', role: '技术专家', product: 'LPDDR/D2D/SerDes IP', tech: ['LPDDR', 'D2D', 'SerDes'], note: '原联发科技术专家' },
        { id: 'cc_wong', name: 'C.C. Wong', comp: 'kuixin', role: '高速传输介面专家', product: '高速接口IP', tech: ['高速传输'], note: '原M31/瑞昱/联发科背景' },

        // ————— 芯耀辉 —————
        { id: 'zeng_keqiang', name: '曾克强', comp: 'xinyaohui', role: '创始人/董事长', product: '高速接口IP', tech: ['IP销售管理'], note: '原Synopsys上海总经理' },
        { id: 'li_mengzhang', name: '李孟璋', comp: 'xinyaohui', role: '副总经理/CTO', product: 'DDR/PCIe/SerDes', tech: ['射频模拟', '芯片设计'], note: '曾任德州仪器/晨星半导体/紫光展锐' },

        // ————— 核芯互联 —————
        { id: 'hu_kangqiao', name: '胡康桥', comp: 'hexin', role: '创始人/CEO', product: 'SerDes IP/数据转换器', tech: ['高速接口', 'ADC/DAC'], note: '清华+美国莱斯大学，AMD高级研发工程师' },

        // ————— 瑞发科 —————
        { id: 'wang_yuanlong', name: '王元龙', comp: 'ruifaka', role: '创始人/董事长', product: 'HSMT车载SerDes', tech: ['车载SerDes', '音视频接口'] },
        { id: 'wang_lixin_rf', name: '王立新', comp: 'ruifaka', role: '联合创始人/副总裁', product: '车载SerDes', tech: ['车载芯片设计'] },

        // ————— 仁芯科技 —————
        { id: 'dang_weiguang', name: '党伟光', comp: 'renxin', role: '创始人/董事长', product: 'R-LinC车载SerDes', tech: ['车载SerDes'], note: '曾在诺基亚/高通/新思任职' },
        { id: 'liang_yuanjun', name: '梁远军', comp: 'renxin', role: '联合创始人/CTO', product: '车载SerDes', tech: ['SerDes设计'], note: '电子科技大学博士，SerDes领域资深' },

        // ————— 光梓信息 —————
        { id: 'chiang_peilin', name: 'Patrick Chiang(姜培)', comp: 'guangzi', role: '创始人/CEO', product: '400G PAM4光通信芯片', tech: ['光通信', 'PAM4'] },
        { id: 'shi_fang', name: '史方', comp: 'guangzi', role: '联合创始人', product: 'VCSEL Driver/TIA', tech: ['光芯片'], note: '浙大+斯坦福+伊利诺伊，前英特尔/美光' },

        // ————— 元启半导体 —————
        { id: 'zhu_ningning', name: '朱宁宁', comp: 'yuanqi', role: '创始人/董事长', product: '高速oDSP/112G SerDes', tech: ['DSP', 'SerDes'] },

        // ————— 慷智集成 —————
        { id: 'liu_wenjun', name: '刘文军', comp: 'kangzhi', role: '创始人/董事长', product: '车载高清视频传输SerDes', tech: ['车载SerDes', '多媒体'], note: '前海思美国IC Lab首席多媒体科学家' },
        { id: 'liu_xin', name: '刘昕', comp: 'kangzhi', role: 'CTO', product: '车载SerDes', tech: ['芯片设计'] },

        // ————— 联芸科技 —————
        { id: 'fang_xiaoling', name: '方小玲', comp: 'lianyun', role: '创始人/董事长', product: '以太网PHY/存储主控', tech: ['PHY', '存储控制器'], note: '女博士，前JMicron' },

        // ————— 灿芯半导体 —————
        { id: 'zhuang_zhiqing', name: '庄志青', comp: 'chancore', role: '创始人/CEO', product: 'SerDes IP/DDR/PCIe', tech: ['IP设计'] },

        // ————— 龙迅 —————
        { id: 'chen_feng', name: '陈峰', comp: 'longxun', role: '创始人/董事长', product: '高速接口芯片', tech: ['高速接口'] },
        { id: 'su_jin', name: '苏进', comp: 'longxun', role: '研发部总监/副总经理', product: 'DP/eDP/USB-C/Repeater', tech: ['高速接口'] },
    ],

    // 产品 = projects
    products: [
        // 高速112G+
        { id: 'niuke-112g', name: '112G Combo SerDes', comp: 'niuke', status: '量产', desc: '112G/64G PAM4/NRZ Combo SerDes IP', platform: '先进工艺', tek: 5, client: ['数据中心', 'AI加速器'] },
        { id: 'niuke-pcie6', name: 'PCIe 6.0 PHY', comp: 'niuke', status: '研发中', desc: 'PCIe 6.0/CXL 3.0 SerDes PHY', platform: '先进工艺', tek: 5, client: ['AI服务器', '存储'] },
        { id: 'orange-112g', name: '112G SerDes IP', comp: 'orangechip', status: '量产', desc: '56G/112G SerDes IP + 光模块DSP芯片', platform: '先进工艺', tek: 5, client: ['光模块', '数据中心'] },
        { id: 'orange-dsp', name: '光模块DSP芯片', comp: 'orangechip', status: '量产', desc: '高速光模块DSP信号处理芯片', platform: '先进工艺', tek: 5, client: ['CPO/LPO光模块'] },
        { id: 'taorun-112g', name: '112G SerDes', comp: 'taorun', status: '量产', desc: '56G/112G PAM4 SerDes', platform: '先进工艺', tek: 4, client: ['数据中心', '通信'] },
        { id: 'innosilicon-hbm3e', name: 'HBM3E/4 PHY&Controller', comp: 'innosilicon', status: '量产', desc: 'HBM3E/HBM4内存PHY+控制器', platform: '先进工艺', tek: 5, client: ['AI芯片', 'GPU'] },
        { id: 'innosilicon-gddr7', name: 'GDDR7 PHY&Controller', comp: 'innosilicon', status: '量产', desc: 'GDDR7显存PHY+控制器', platform: '先进工艺', tek: 5, client: ['GPU', 'AI加速'] },
        { id: 'innosilicon-uciel', name: 'UCIe Chiplet(INNOLINK™)', comp: 'innosilicon', status: '量产', desc: 'UCIe Chiplet互连IP', platform: '先进工艺', tek: 5, client: ['Chiplet', 'AI芯片'] },
        { id: 'innosilicon-112g', name: '112G SerDes', comp: 'innosilicon', status: '量产', desc: '112G/56G/32G/25G SerDes全系列', platform: '先进工艺', tek: 5, client: ['数据中心', '通信'] },
        { id: 'innosilicon-pcie6', name: 'PCIe 6.0/CXL 3.0', comp: 'innosilicon', status: '量产', desc: 'PCIe 6.0/CXL 3.0 PHY+Controller', platform: '先进工艺', tek: 5, client: ['AI服务器'] },
        { id: 'shenglianke-112g', name: '112G PAM4 SerDes', comp: 'shenglianke', status: '量产', desc: '112G PAM4 SerDes IP + IO Die', platform: '先进工艺', tek: 4, client: ['数据中心', 'AI芯片'] },
        { id: 'shenglianke-pcie6', name: 'PCIe 6.0/5.0 PHY', comp: 'shenglianke', status: '量产', desc: 'PCIe 6.0/5.0 SerDes PHY', platform: '先进工艺', tek: 4, client: ['AI服务器'] },
        { id: 'zhongyin-112g', name: '112G SerDes', comp: 'zhongyin', status: '量产', desc: '112G SerDes IP', platform: '先进工艺', tek: 4, client: ['数据中心'] },
        { id: 'zhongyin-pcie5', name: 'PCIe 5.0 PHY', comp: 'zhongyin', status: '量产', desc: 'PCIe 5.0 SerDes PHY', platform: '先进工艺', tek: 4, client: ['AI服务器'] },
        { id: 'zhongyin-hbm3e', name: 'HBM3E PHY', comp: 'zhongyin', status: '量产', desc: 'HBM3E PHY IP', platform: '先进工艺', tek: 4, client: ['AI芯片'] },
        { id: 'kuixin-hbm3', name: 'HBM3 PHY&Controller', comp: 'kuixin', status: '研发中', desc: 'HBM3内存接口IP', platform: '先进工艺', tek: 3, client: ['AI芯片', 'GPU'] },
        { id: 'kuixin-ucie', name: 'UCIe Chiplet', comp: 'kuixin', status: '研发中', desc: 'UCIe Die-to-Die互连IP', platform: '先进工艺', tek: 3, client: ['Chiplet'] },
        { id: 'yuanqi-odsp', name: '高速oDSP', comp: 'yuanqi', status: '研发中', desc: '高速光模块oDSP芯片', platform: '先进工艺', tek: 3, client: ['光模块', 'CPO'] },

        // 车载SerDes
        { id: 'ruifaka-hsmt', name: 'HSMT车载SerDes', comp: 'ruifaka', status: '量产', desc: '车载高速视频传输SerDes芯片组', platform: '车规工艺', tek: 4, client: ['车载摄像头', 'ADAS'] },
        { id: 'renxin-rlinc', name: 'R-LinC车载SerDes', comp: 'renxin', status: '量产', desc: '16Gbps Camera + 32Gbps Display SerDes', platform: '车规工艺', tek: 3, client: ['智能座舱', 'ADAS'] },
        { id: 'kangzhi-autoserdes', name: '车载高清SerDes', comp: 'kangzhi', status: '量产', desc: '智能车载高清视频传输SERDES芯片', platform: '车规工艺', tek: 3, client: ['车载摄像头', '智能座舱'] },
        { id: 'jinglue-asa', name: 'SerDes ASA PHY', comp: 'jinglue', status: '量产', desc: '车载SerDes ASA接口PHY', platform: '车规工艺', tek: 3, client: ['车载以太网'] },
        { id: 'aixince-autoserdes', name: '车载SerDes芯片', comp: 'aixince', status: '研发中', desc: '车载SerDes芯片', platform: '车规工艺', tek: 2, client: ['车载摄像头'] },

        // 光通信
        { id: 'guangzi-400g', name: '400G PAM4光通信芯片', comp: 'guangzi', status: '量产', desc: '400G PAM4光通信SoC芯片', platform: '先进工艺', tek: 3, client: ['光模块', '数据中心'] },
        { id: 'guangzi-vcsel', name: 'VCSEL Driver/TIA', comp: 'guangzi', status: '量产', desc: '4x25Gbps VCSEL Driver和TIA芯片', platform: '先进工艺', tek: 3, client: ['光模块'] },

        // 光模块
        { id: 'zqte-800g', name: '800G/1.6T光模块', comp: 'zqte', status: '量产', desc: '800G/1.6T高速光模块，LPO/CPO方案', platform: '—', tek: 5, client: ['AI数据中心'] },

        // DDR/存储
        { id: 'lantiq-ddr5', name: 'DDR5内存接口芯片', comp: 'lantiq', status: '量产', desc: 'DDR5 RCD/MDB/SPD Hub/PMIC全套芯片组', platform: '先进工艺', tek: 4, client: ['服务器', '数据中心'] },
        { id: 'lantiq-pcie', name: 'PCIe 5.0 Retimer', comp: 'lantiq', status: '量产', desc: 'PCIe 5.0/CXL Retimer芯片', platform: '先进工艺', tek: 4, client: ['AI服务器'] },

        // 其他
        { id: 'fangcheng-56g', name: '16nm 56G PAM4 SerDes', comp: 'fangcheng', status: '量产', desc: '16nm工艺56G PAM4 SerDes + 32G ADC', platform: '16nm', tek: 2, client: ['通信'] },
    ],

    // 技术方向 = directions
    directions: [
        { id: 'hs-serdes', name: '112G/56G高速SerDes', companies: ['niuke', 'orangechip', 'taorun', 'innosilicon', 'shenglianke', 'zhongyin', 'kuixin', 'yuanqi'], equip: '高速示波器>70GHz、误码仪、网络分析仪', tek: 5, desc: 'AI集群对112G/224G SerDes需求爆发，国产替代窗口期' },
        { id: 'pcie6', name: 'PCIe 6.0/CXL 3.0', companies: ['niuke', 'innosilicon', 'shenglianke', 'zhongyin'], equip: 'PCIe协议分析仪、高速示波器、TDR', tek: 5, desc: 'PCIe 6.0 64GT/s PAM4，CXL 3.0加速器互连' },
        { id: 'hbm', name: 'HBM/GDDR内存接口', companies: ['innosilicon', 'kuixin', 'zhongyin'], equip: '高速内存测试系统、信号分析仪', tek: 5, desc: 'HBM3E/4和GDDR7是AI芯片标配，国产PHY替代空间大' },
        { id: 'chiplet', name: 'UCIe Chiplet互连', companies: ['innosilicon', 'kuixin', 'shenglianke'], equip: 'Die-to-Die测试、高速信号测试', tek: 4, desc: 'Chiplet架构成为AI芯片主流，UCIe标准加速推进' },
        { id: 'auto-serdes', name: '车载SerDes', companies: ['kangzhi', 'ruifaka', 'renxin', 'aixince', 'jinglue', 'langtianmu'], equip: '车载以太网测试、MIPI A-PHY测试、信号分析仪', tek: 4, desc: 'ADAS/智能座舱驱动车载SerDes国产替代，车规级要求高' },
        { id: 'optic-dsp', name: '光模块DSP', companies: ['orangechip', 'yuanqi'], equip: '高速误码仪、光调制分析仪', tek: 5, desc: 'CPO/LPO时代DSP芯片是关键，5nm/3nm工艺需求' },
        { id: 'optical-module', name: '光模块/CPO/LPO', companies: ['zqte', 'guangzi', 'orangechip'], equip: '光波分析仪、高速示波器、光谱仪', tek: 5, desc: 'AI集群互连推动800G/1.6T光模块需求，CPO量产元年' },
        { id: 'ddr', name: 'DDR5/LPDDR内存接口', companies: ['lantiq', 'niuke', 'innosilicon', 'kuixin', 'zhongyin', 'xinyaohui'], equip: 'DDR5测试系统、信号完整性分析', tek: 4, desc: 'DDR5渗透率提升，LPDDR6即将落地' },
        { id: 'adc-dac', name: '高速ADC/DAC', companies: ['taorun', 'fangcheng', 'verisilicon', 'hexin'], equip: '任意波发生器、频谱分析仪', tek: 3, desc: '高速ADC/DAC是SerDes/雷达/通信的基础器件' },
        { id: 'phymac', name: '以太网PHY/MAC', companies: ['lianyun', 'jinglue', 'wangxun'], equip: '以太网测试仪、网络分析仪', tek: 3, desc: '车载以太网PHY(10BASE-T1S等)和云数据中心PHY需求' },
        { id: 'mipi', name: 'MIPI D/C-PHY接口', companies: ['niuke', 'innosilicon', 'ruicheng', 'gaoyun', 'verisilicon', 'longxun'], equip: 'MIPI测试方案、示波器', tek: 3, desc: 'MIPI D-PHY/C-PHY在手机/车载显示中广泛使用' },
    ],

    // 技术分类 = departments
    categories: [
        { id: 'cat-hs', name: '高速SerDes（56G/112G+）', companies: ['niuke', 'orangechip', 'taorun', 'innosilicon', 'shenglianke', 'zhongyin', 'kuixin', 'yuanqi', 'fangcheng'], desc: '面向AI数据中心的超高速SerDes IP和芯片，112G PAM4是当前主流' },
        { id: 'cat-auto', name: '车载SerDes', companies: ['kangzhi', 'ruifaka', 'renxin', 'aixince', 'jinglue', 'langtianmu'], desc: '面向ADAS/智能座舱的车载视频和数据传输SerDes' },
        { id: 'cat-optic', name: '光通信芯片', companies: ['zqte', 'orangechip', 'guangzi', 'yuanqi'], desc: '光模块DSP、Driver/TIA、光模块（CPO/LPO）' },
        { id: 'cat-ip', name: '全栈IP厂商', companies: ['innosilicon', 'verisilicon', 'chancore', 'xinyaohui', 'xinchuliu', 'ruicheng', 'hexin', 'kuixin'], desc: '提供多种IP组合，覆盖SerDes/DDR/PCIe/USB/MIPI等' },
        { id: 'cat-ddr', name: '内存接口芯片', companies: ['lantiq', 'niuke', 'innosilicon', 'zhongyin'], desc: 'DDR5/LPDDR/LPDDR6内存接口芯片和PHY' },
        { id: 'cat-public', name: '已上市/IPO中', companies: ['lantiq', 'verisilicon', 'chancore', 'zqte', 'lianyun', 'longxun', 'niuke', 'zhongyin', 'ruifaka', 'ruicheng'], desc: 'A股/科创板上市公司或已在上市进程中的公司' },
    ],
};
