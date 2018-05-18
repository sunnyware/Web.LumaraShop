import {JsonCommand} from '../utils/json/json-command';

export class LumaraServiceCommands {
  public static GetUserAccessRights(): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.MitarbeiterService';
    cmd.CommandName = 'GetUserAccessRights';
    // cmd.addParameter('user_id', user_id);
    return cmd;
  }

  public static GetMitarbeiterList(): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.MitarbeiterService';
    cmd.CommandName = 'GetMitarbeiterList';
    // cmd.addParameter('user_id', user_id);
    return cmd;
  }
}
