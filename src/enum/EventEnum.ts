module Balance {
	/**
	 *
	 * @author ChenJie
	 *
	 */
	export class EventEnum {
		public constructor() {
		}
		
        public static GAME_START = "game_start";//游戏开始
        public static GAME_OVER = "game_over";//游戏结束，胜负的判断根据GameController类中的isWin参数判断
        public static GAME_RESTART = "game_restart";//游戏结束之后重新开始
        public static STAR_DESTROY = "star_destroy";//星星被吃，或者落在跷跷板上后消失
        public static STAR_TAKE = "star_taken";//吃到星星
        public static TIME_OVER = "time_over";//倒计时时间到
        public static ROLE_FALL = "";//人从跷跷板跌倒
	}
}
