var Main = {
    data() {
        return {
            menuShow: false,
            likeSwitch: 0,
            likeCustom: 0,
            likeWordNumber: "",
            likeReadNumber: "",
            likeDate: "",
            commentSwitch: 0,
            commentCustom: 0,
            commentWordNumber: 0,
            commentReadNumber: 0,
            commentDate: "",
            commentRangeSwitch: 0,
            commentRange: [100,2000],                    
            commentDialog: {
                visible: false,
                title: "默认标题",
                text: "",
                new: true,
                source: "",
                index: "",
                /* 禁用判断 */
                checkDisabled(){
                    if(this.text.length == 0){
                        return true;
                    }else{
                        while(this.text.indexOf(" ") >= 0){
                            this.text=this.text.replace(" ","");
                        }
                    }
                    return false;
                }
            },
            importDialog: {
                visible: false,
                hasResult: false,
                loading: false,
                success: false,
                title: "导入评论",
                footer: "查询",
                text: "",
                commentList: "",
                checkDisabled(){
                    if(this.text.length == 0 || this.loading){
                        return true;
                    }else{
                        while(this.text.indexOf(" ") >= 0){
                            this.text=this.text.replace(" ","");
                        }
                    }
                    return false;
                }

            },
            currentPage: {
                R: 1,
                S: 1,
                M: 1,
                L: 1,
                pageSize: 5
            },
            dateOptions: [{
                value: this.getDateOption(0),
                label: '今天'
                }, {
                value: this.getDateOption(3600 * 1000 * 24 * 7),
                label: '一周内'
                }, {
                value: this.getDateOption(3600 * 1000 * 24 * 30),
                label: '一月内'
                }, {
                value: this.getDateOption(3600 * 1000 * 24 * 30 * 12),
                label: '一年内'
                }, {
                value: this.getDateOption(3600 * 1000 * 24 * 30 * 12 * 2),
                label: '两年内'
                }, {
                value: this.getDateOption(3600 * 1000 * 24 * 30 * 12 * 5),
                label: '五年内'
                }, {
                value: this.getDateOption(3600 * 1000 * 24 * 30 * 12 * 10),
                label: '十年内'
                }, {
                value: '1999-12-01',
                label: '不限'
                }
            ],
            commentList: {
                R: [
                    {text: "写的不错哦,欢迎回访我的博客哦"},
                    {text: "前排支持一下,可以的话来我博客看看吧"},
                    {text: "我在大佬的评论区瑟瑟发抖,希望能引起注意并回访我的博客哈哈"},
                    {text: "膜拜技术大佬,来我博客指点江山吧"},
                    {text: "分享技术,不错哦"},
                    {text: "少年,我看你骨骼精奇,不如来我博客看看可好"}
                ],
                S: [
                    {text: "虽然字数不多,但是写的非常棒!欢迎回访我的博客"},
                    {text: "字不在多在于精"},
                    {text: "少年,我看你骨骼精奇,不如多敲几行字可好"},
                    {text: "博客破万卷,代码如有神"},
                    {text: "字不多却铿锵有力"},
                    {text: "一文不赞何以赞天下"}
                ],
                M: [
                    {text: "写的不错,活到老,学到老!欢迎回访我的博客"},
                    {text: "欢迎来我博客看看,可以顺手点赞也是极好的"},
                    {text: "前排支持一下,欢迎回访我的博客"},
                    {text: "都是干货,谢谢了,欢迎回访我的博客"},
                    {text: "向你学习,欢迎回访我的博客"},
                    {text: "写的真好,如果可以,欢迎回访我的博客"}
                    
                ],
                L: [
                    {text: "写了这么多字,手动码字一定很累吧!欢迎回访我的博客"},
                    {text: "我在大佬的评论区瑟瑟发抖,欢迎大佬回访我的博客"},
                    {text: "膜拜技术大佬,来我博客指点江山吧"},
                    {text: "收获满满,码字不易,欢迎回访我的博客"},
                    {text: "不曾想,若是有一天我能像你一样写出这么好的博客该多好,欢迎来我的博客指点"},
                    {text: "天若有情天亦老,来我博客看看可好"}
                    
                ]
            },
        };
    },
    mounted() {
        this.initItem("likeSwitch",0);
        this.initItem("likeCustom",0);
        this.initItem("likeWordNumber",100);
        this.initItem("likeReadNumber",100);
        this.initItem("likeDate",this.getDateOption(3600 * 1000 * 24 * 30 * 12));

        this.initItem("commentSwitch",0);
        this.initItem("commentCustom",0);
        this.initItem("commentWordNumber",100);
        this.initItem("commentReadNumber",100);
        this.initItem("commentDate",this.getDateOption(3600 * 1000 * 24 * 30 * 12));
        this.initItem("commentRangeSwitch",0);
        this.initItem("commentRange",[100,2000]);

        this.initItem("commentList",this.commentList);

        if(!localStorage.today){
            var date = new Date();
            localStorage.today = date.getDate();
        }

    },
    methods: {
        /* 初始化localStorage */
        initItem(item,value){
            if (localStorage[item]) {
                switch (item) {
                    case "commentRange":
                        var str = localStorage.commentRange;
                        this.commentRange = [str.split(",")[0],str.split(",")[1]];
                        break;
                    case "commentList":
                        this.commentList = JSON.parse(localStorage.commentList);
                        break;
                    default:this[item] = localStorage[item];
                        break;
                }
            }else{
                switch (item) {
                    case "commentList":
                        this.commentList = value;
                        localStorage.commentList = JSON.stringify(value);
                        break;
                
                    default:this[item] = localStorage[item] = value;
                        break;
                }
            }
        },
        /**
         *评论类别码
         * 0:随机评论
         * 1:少字数评论
         * 2:中等字数评论
         * 3:多字数评论
         * */
        getCommentType(type){
            var str;
            switch (type) {
                case 0:str = "R";break;
                case 1:str = "S";break;
                case 2:str = "M";break;
                case 3:str = "L";break;
                default:break;
            }
            return str;
        },
        /* 负责日期选择器的日期格式化:时间戳减去多少毫秒之前 */
        getDateOption(time){
            var date = new Date();
            date.setTime(date.getTime() - time);
            return (date.getFullYear()) + "-" + (date.getMonth() + 1) + "-" + (date.getDate());
        },
        /* 新建评论 */
        commentNew(type){
            this.commentDialog.new = true;
            this.commentDialog.title = "新建评论";
            this.commentDialog.source = this.getCommentType(type);
            this.commentDialog.text = "";
            this.commentDialog.visible = true;
        },
        /* 编辑评论 */
        commentEdit(index, row, type) {
            /* 获取到R-S-M-L */
            var typeCode = this.getCommentType(type);
            /* 通过当前页码,选中表格的行数以及页码尺寸获得在数组中的固定序列:0+(2-1)*5=5,第二页的第一行即数组的下标为5 */ 
            var staticIndex = index + ((this.currentPage[typeCode]-1)*this.currentPage.pageSize);
            this.commentDialog.new = false;
            this.commentDialog.title = "编辑评论";
            this.commentDialog.source = typeCode;
            this.commentDialog.text = this.commentList[typeCode][staticIndex].text;
            this.commentDialog.index = index;
            this.commentDialog.visible = true;
        },
        /* 删除评论 */
        commentDelete(index, row, type) {
            var typeCode = this.getCommentType(type);
            var staticIndex = index + ((this.currentPage[typeCode]-1)*this.currentPage.pageSize);
            this.commentList[typeCode].splice(staticIndex,1);
            this.saveComment();
        },
        /* 打开导入评论窗口 */
        commentOpenImport(){
            this.importDialog.text = "";
            this.importDialog.hasResult = false;
            this.importDialog.footer = "查询";
            this.importDialog.visible = true;
        },
        /* 导入评论 */
        commentImport(){
            if(!this.importDialog.commentList.type){return}
            switch (this.importDialog.commentList.type) {
                case "all":
                    this.commentList = this.importDialog.commentList;
                    break;
                case "random":
                    this.commentList.R = this.importDialog.commentList.R;
                    break;
                case "word":/* 字数分段评论(S+M+L) */
                    this.commentList.S = this.importDialog.commentList.S;
                    this.commentList.M = this.importDialog.commentList.M;
                    this.commentList.L = this.importDialog.commentList.L;
                    break;
                case "s":
                    this.commentList.S = this.importDialog.commentList.S;
                    break;
                case "m":
                    this.commentList.M = this.importDialog.commentList.M;
                    break;
                case "l":
                    this.commentList.L = this.importDialog.commentList.L;
                    break;
                default:
                    break;
            }
            this.saveComment();
            console.log("导入成功");
            this.importDialog.hasResult = true;
            this.importDialog.success = false;
            this.importDialog.loading = false;
            this.importDialog.visible = false;
            this.$message({
                showClose: true,
                message: '评论导入成功,共导入' + this.importDialog.commentList.count + "条评论!",
                type: 'success'
            });
        },
        /* 查询评论文件 */
        commentQuery(){
            this.importDialog.loading = true;
            /* 查询完毕并且成功请求返回时 */
            if( this.importDialog.hasResult && this.importDialog.success){
                this.commentImport();
                return;
            }
            
            axios
            .get(this.importDialog.text)
            .then(response => {
                this.importDialog.commentList = response.data.commentList;
                console.log(this.importDialog.commentList);
                // this.importDialog.hasResult = true;
                this.importDialog.success = true;
                this.importDialog.footer = "导入";
            })
            .catch(error => {
                console.log(error);
                this.importDialog.success = false;
                this.importDialog.footer = "查询";
                this.$message({
                    showClose: true,
                    message: '链接解析失败',
                    type: 'error'
                });
                return;
            })
            .finally(() => {
                this.importDialog.hasResult = true;
                this.importDialog.loading = false;
            })
        },
        /* 以下4个负责监控分页的变化并实时反馈 */
        currentPageChange_R(page){
            this.currentPage.R = page;
        },
        currentPageChange_S(page){
            this.currentPage.S = page;
        },
        currentPageChange_M(page){
            this.currentPage.M = page;
        },
        currentPageChange_L(page){
            this.currentPage.L = page;
        },
        /* 提交评论内容到Vue */
        postComment(){
            var comment = {text:this.commentDialog.text}
            if(this.commentDialog.new){
                this.commentList[this.commentDialog.source].push(comment);
            }else{
                this.commentList[this.commentDialog.source][this.commentDialog.index] = comment;
            }
            this.saveComment();
            this.commentDialog.visible = false;
        },
        /* 保存到localStorage */
        saveComment(){
            localStorage.commentList = JSON.stringify(this.commentList);
        },
        postChange(){
            /* 点赞配置保存到localStorage */
            localStorage.likeSwitch = this.likeSwitch;
            localStorage.likeCustom = this.likeCustom;
            localStorage.likeWordNumber = this.likeWordNumber;
            localStorage.likeReadNumber = this.likeReadNumber;
            var like_Date = new Date(this.likeDate);
            localStorage.likeDate = (like_Date.getFullYear()) + "-" + (like_Date.getMonth() + 1) + "-" + (like_Date.getDate());

            /* 评论配置保存到localStorage */
            localStorage.commentSwitch = this.commentSwitch;
            localStorage.commentCustom = this.commentCustom;
            localStorage.commentWordNumber = this.commentWordNumber;
            localStorage.commentReadNumber = this.commentReadNumber;
            localStorage.commentRangeSwitch = this.commentRangeSwitch;
            localStorage.commentRange = this.commentRange;
            var comment_Date = new Date(this.commentDate);
            localStorage.commentDate = (comment_Date.getFullYear()) + "-" + (comment_Date.getMonth() + 1) + "-" + (comment_Date.getDate());

            this.menuShow = false;
        },
        
    }
};
var Ctor = Vue.extend(Main);
var ctor = new Ctor();
ctor.$mount("#app");