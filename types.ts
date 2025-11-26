export interface Account {
  id: number;
  roleName: string;
  className: string;
  level: number;
  gold: number;
  status: 'Idle' | 'Running' | 'Paused' | 'Error' | 'Offline';
  configName: string;
  preOrder: boolean;
  selected: boolean;
}

export enum GameClass {
  LingXiao = '凌霄',
  TianCe = '天策',
  ShuiJing = '水晶',
  YunYing = '云影',
  LingTai = '灵台',
  ShouWang = '兽王',
  TianYin = '天音',
  HuoYun = '火云',
  YouMing = '幽冥',
  TianHuang = '天荒'
}

export interface ScriptConfig {
  autoCreateClass: GameClass;
  guildSkillSell: number;
  otherItemSell: number;
  doTasks1_28: boolean;
  doCookingAlchemy: boolean;
  addFriend: boolean;
  addFriendNames: string;
}

export interface GlobalSettings {
  optimization1: boolean;
  optimization2: boolean;
  autoSwitch: boolean;
  scheduledStart: boolean;
  loopAccounts: boolean;
  loginNoSelect: boolean;
  loginNoExec: boolean;
  lowSpecMode: boolean; // "Foreign Garbage"
  instanceCount: number;
  activeConfigProfile: string;
}

export type View = 'MAIN' | 'CONFIG' | 'LOGS';
