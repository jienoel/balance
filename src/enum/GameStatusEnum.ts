module Balance {
	/**
	 *
	 * @author ChenJie
	 *
	 */
	export class GameStatusEnum {
		public constructor() {
		}
		
        public static INIT = -1;
		public static START = 0
        public static RUNNING = 10;
        public static WIN = 20;
        public static FAIL = 21;
	}
}
