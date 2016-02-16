module Balance {
	/**
	 *
	 * @author 
	 *
	 */
	export class playerEnum {
        
    	//status
        public static STATE_NULL: number = -1;   //Avatar未添加，属于休眠状态
        public static STATE_ACTIVE: number = 0;  //Avatar添加到舞台，但是没有指定动作
    	public static STATE_IDLE: number = 1;
        public static STATE_WALK: number = 2;
        
        //player role
        public static ROLE_PRINCESS: number = 100;
        public static ROLE_BOY: number = 101;
        public static ROLE_DUCK: number = 102;
		public constructor() {
		}
	}
}
