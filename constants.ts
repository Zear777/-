import { Account, GameClass, ScriptConfig, GlobalSettings } from './types';

export const MOCK_ACCOUNTS: Account[] = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  roleName: `User_${Math.floor(Math.random() * 1000)}`,
  className: Object.values(GameClass)[i % 10],
  level: 60 + Math.floor(Math.random() * 40),
  gold: Math.floor(Math.random() * 500000),
  status: i === 0 ? 'Running' : i === 1 ? 'Error' : 'Idle',
  configName: 'Default_Farm',
  preOrder: false,
  selected: false,
}));

export const DEFAULT_SCRIPT_CONFIG: ScriptConfig = {
  autoCreateClass: GameClass.TianCe,
  guildSkillSell: 0,
  otherItemSell: 0,
  doTasks1_28: true,
  doCookingAlchemy: false,
  addFriend: false,
  addFriendNames: '',
};

export const DEFAULT_GLOBAL_SETTINGS: GlobalSettings = {
  optimization1: true,
  optimization2: false,
  autoSwitch: false,
  scheduledStart: false,
  loopAccounts: true,
  loginNoSelect: false,
  loginNoExec: false,
  lowSpecMode: false,
  instanceCount: 5,
  activeConfigProfile: 'Daily_Routine_v1'
};

export const GUILD_SELL_OPTIONS = [20, 10, 0, -10, -20, -30, -40, -50];
export const OTHER_SELL_OPTIONS = [0, -10, -20, -30];
