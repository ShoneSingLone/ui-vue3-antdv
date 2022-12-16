export type t_anyStringString = [string, string];
export type t_subfix<TKey, TSubfix extends string> = TKey extends number
	? `${TKey}${TSubfix}`
	: never;
export type t_offsetString =
	| "auto"
	| "t"
	| "r"
	| "b"
	| "l"
	| "lt"
	| "lb"
	| "rt"
	| "rb";

export interface i_layerOptions {
	contentClass?: string;
	/* type - 基本层类型;
    类型：number，默认：0
    layer提供了5种层类型。可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。 若你采用layer.open({type: 1})方式调用，则type为必填项（信息框除外）
    */
	type?: number;
	/* title - 标题;
    类型：string/Array/boolean，默认：'信息'
    title支持三种类型的值，若你传入的是普通的字符串，如title :'我是标题'，那么只会改变标题文本；若你还需要自定义标题区域样式，那么你可以title: ['文本', 'font-size:18px;']，数组第二项可以写任意css样式；如果你不想显示标题栏，你可以title: false
     */
	title?: string | t_anyStringString | boolean;
	/*content - 内容;
    类型：string|HTMLElement/Array，默认：''
    content可传入的值是灵活多变的，不仅可以传入普通的html内容，还可以指定DOM，更可以随着type的不同而不同。
    content: '传入任意的文本或html' //这里content是一个普通的String
    content: $('#id') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
    content: str //注意，如果str是object，那么需要字符拼接。
    content: 'http://sentsin.com' //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
    content: ['内容', '#id'] //数组第二项即吸附元素选择器或者DOM
    */
	content?: string | HTMLElement | t_anyStringString;
	/* skin - 样式类名;
    类型：string，默认：''
    
    skin不仅允许你传入layer内置的样式class名，还可以传入您自定义的class名。这是一个很好的切入点，意味着你可以借助skin轻松完成不同的风格定制。目前layer内置的skin有：layui-layer-lanlayui-layer-molv，未来我们还会选择性地内置更多，但更推荐您自己来定义。以下是一个自定义风格的简单例子
     */
	skin?: string;
	/* area - 宽高;
    类型：string/Array，默认：'auto'
    
    在默认状态下，layer是宽高都自适应的，但当你只想定义宽度时，你可以area: '500px'，高度仍然是自适应的。当你宽高都要定义时，你可以area: ['500px', '300px']
     */
	area?: string | t_anyStringString;
	/* offset - 坐标;
    类型：string/Array，默认：垂直水平居中
    offset默认情况下不用设置。但如果你不想垂直水平居中，你还可以进行以下赋值：
    
    值	备注
    offset: 'auto'	默认坐标，即垂直水平居中
    offset: '100px'	只定义top坐标，水平保持居中
    offset: ['100px', '50px']	同时定义top、left坐标
    offset: 't'	快捷设置顶部坐标
    offset: 'r'	快捷设置右边缘坐标
    offset: 'b'	快捷设置底部坐标
    offset: 'l'	快捷设置左边缘坐标
    offset: 'lt'	快捷设置左上角
    offset: 'lb'	快捷设置左下角
    offset: 'rt'	快捷设置右上角
    offset: 'rb'	快捷设置右下角
     */
	offset?: t_subfix<number, "px"> | t_anyStringString | t_offsetString;
	/* icon - 图标。信息框和加载层的私有参数;
    类型：number，默认：-1（信息框）/0（加载层）
    
    信息框默认不显示图标。当你想显示图标时，默认皮肤可以传入0-6如果是加载层，可以传入0-2。如：
     */
	icon?: number;
	/* btn - 按钮;
    类型：string/Array，默认：'确认'
    MSG模式时，btn默认是一个确认按钮，其它层类型则默认不显示，加载层loading和tips层则无效。
    当您只想自定义一个按钮时，你可以btn: '我知道了'，
    当你要定义两个按钮时，你可以btn: ['yes', 'no']。
    你也可以定义更多按钮，比如：btn: ['按钮1', '按钮2', '按钮3', …]，
    按钮1的回调是yes，
    而从按钮2开始，
    则回调为btn2: function(){}，
     */
	btn?: string | t_anyStringString;
	/* btnAlign - 按钮排列;
    类型：string，默认：r
    你可以快捷定义按钮的排列位置，btnAlign的默认值为r，即右对齐。该参数可支持的赋值如下：
    值	备注
    btnAlign: 'l'	按钮左对齐
    btnAlign: 'c'	按钮居中对齐
    btnAlign: 'r'	按钮右对齐。默认值，不用设置
     */
	btnAlign?: "l" | "c" | "r";
	/* closeBtn - 关闭按钮;
    类型：string/boolean，默认：1
    
    layer提供了两种风格的关闭按钮，可通过配置1和2来展示，如果不显示，则closeBtn: 0
     */
	closeBtn?: string | boolean;
	/* shade - 遮罩;
    类型：string/Array/boolean，默认：0.3
    
    即弹层外区域。默认是0.3透明度的黑色背景（'#000'）。
    定义别的颜色，可以shade: [0.8, '#393D49']；
    如果你不想显示遮罩，可以shade: 0
     */
	shade?: string | t_anyStringString | boolean;
	/* shadeClose - 是否点击遮罩关闭;
    类型：boolean，默认：false
    
    如果你的shade是存在的，那么你可以设定shadeClose来控制点击弹层外区域关闭。
     */
	shadeClose?: boolean;
	/* time - 自动关闭所需毫秒;
    类型：number，默认：0
    
    默认不会自动关闭。当你想自动关闭时，可以time: 5000，即代表5秒后自动关闭，注意单位是毫秒（1秒=1000毫秒）
     */
	during?: number;
	/* id - 用于控制弹层唯一标识;
    类型：string，默认：空字符
    
    设置该值后，不管是什么类型的层，都只允许同时弹出一个。一般用于页面层和iframe层模式
     */
	id?: string;
	/* anim - 弹出动画;
    类型：number，默认：0
    
    我们的出场动画全部采用CSS3。这意味着除了ie6-9，其它所有浏览器都是支持的。目前anim可支持的动画类型有0-6 如果不想显示动画，设置 anim: -1 即可。另外需要注意的是，3.0之前的版本用的是 shift 参数
    值	备注
    anim: 0	平滑放大。默认
    anim: 1	从上掉落
    anim: 2	从最底部往上滑入
    anim: 3	从左滑入
    anim: 4	从左翻滚
    anim: 5	渐显
    anim: 6	抖动
     */
	anim?: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;
	/* isOutAnim - 关闭动画 （layer 3.0.3新增）;
    类型：boolean，默认：true
    
    默认情况下，关闭层时会有一个过度动画。如果你不想开启，设置 isOutAnim: false 即可
     */
	isOutAnim?: boolean;
	/*  */
	fullscreen?: boolean;
	/* maxmin - 最大最小化。;
    类型：boolean，默认：false
    
    该参数值对type:1和type:2有效。默认不显示最大小化按钮。需要显示配置maxmin: true即可
     */
	maxmin?: boolean;
	/* fixed - 固定;
    类型：boolean，默认：true
    
    即鼠标滚动时，层是否固定在可视区域。如果不想，设置fixed: false即可
     */
	fixed?: boolean;
	/* resize - 是否允许拉伸;
    类型：boolean，默认：true
    
    默认情况下，你可以在弹层右下角拖动来拉伸尺寸。如果对指定的弹层屏蔽该功能，设置 false即可。该参数对loading、tips层无效
     */
	resize?: boolean;
	/* resizing - 监听窗口拉伸动作;
    类型：Function，默认：null
    
    当你拖拽弹层右下角对窗体进行尺寸调整时，如果你设定了该回调，则会执行。回调返回一个参数：当前层的DOM对象
     */
	onResizing?: Function | false;
	/* scrollbar - 是否允许浏览器出现滚动条;
    类型：boolean，默认：true
    
    默认允许浏览器滚动，如果设定scrollbar: false，则屏蔽
     */
	scrollbar?: boolean;
	/* maxWidth - 最大宽度;
    类型：number，默认：360
    
    请注意：只有当area: 'auto'时，maxWidth的设定才有效。
     */
	maxWidth?: number;
	/* maxHeight - 最大高度;
    类型：number，默认：无
    
    请注意：只有当高度自适应时，maxHeight的设定才有效。
     */
	maxHeight?: number;
	/* zIndex - 层叠顺序;
    类型：，默认：1
    
    一般用于解决和其它组件的层叠冲突。
     */
	zIndex?: number;
	/* move - 触发拖动的元素;
    类型：string|HTMLElement/boolean，默认：'.layui-layer-title'
    
    默认是触发标题区域拖拽。如果你想单独定义，指向元素的选择器或者DOM即可。如move: '.mine-move'。你还配置设定move: false来禁止拖拽
     */
	move?: string | HTMLElement | false;
	/* moveOut - 是否允许拖拽到窗口外;
    类型：boolean，默认：false
    
    默认只能在窗口内拖拽，如果你想让拖到窗外，那么设定moveOut: true即可
     */
	moveOut?: boolean;
	/* moveEnd - 拖动完毕后的回调方法;
    类型：Function，默认：null
    
    默认不会触发moveEnd，如果你需要，设定moveEnd: function(layero){}即可。其中layero为当前层的DOM对象
     */
	onMoveEnd?: Function | false;
	/* tips - tips方向和颜色;
    类型：number/Array，默认：2
    
    tips层的私有参数。支持上右下左四个方向，通过1-4进行方向设定。如tips: 3则表示在元素的下面出现。有时你还可能会定义一些颜色，可以设定tips: [1, '#c00']
     */
	tips?: number | t_anyStringString;
	/* tipsMore - 是否允许多个tips;
    类型：boolean，默认：false
    
    允许多个意味着不会销毁之前的tips层。通过tipsMore: true开启
     */
	tipsMore?: boolean;
	/* success - 层弹出后的成功回调方法;
    类型：Function，默认：null
    
    当你需要在层创建完毕时即执行一些语句，可以通过该回调。success会携带两个参数，分别是当前层DOM当前层索引。如：
     */
	success?: Function | false;
	/* yes - 确定按钮回调方法;
    类型：Function，默认：null
    
    该回调携带两个参数，分别为当前层索引、当前层DOM对象。如：
     */
	yes?: Function | false;
	/* cancel - 右上角关闭按钮触发的回调;
    类型：Function，默认：null
    
    该回调携带两个参数，分别为：当前层索引参数（index）、当前层的DOM对象（layero），默认会自动触发关闭。如果不想关闭，return false即可，如；
     */
	onClickClose?: Function | false;
	/* end - 层销毁后触发的回调;
    类型：Function，默认：null
    无论是确认还是取消，只要层被销毁了，end都会执行，不携带任何参数。
     */
	end?: Function | false;
	/* full/min/restore -分别代表最大化、最小化、还原 后触发的回调;
    类型：Function，默认：null
    携带两个参数，即当前层 DOM、当前层索引
     */
	full?: Function | false;
	min?: Function | false;
	restore?: Function | false;
	/* minStack - 是否默认堆叠在左下角;
    类型：boolean，默认：true */
	minStack?: boolean;
}
