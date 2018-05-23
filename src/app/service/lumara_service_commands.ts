import {JsonCommand} from '../utils/json/json-command';

export class LumaraServiceCommands {

  public static GetUserAccessRights(): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
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


  /***** Blogging *****/
  public static GetBlogPosts(archiveID: number, publishedFilter: number, pageNr: number, itemsPerPage: number): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Blogging.Service.BlogService';
    cmd.CommandName = 'GetBlogPosts';
    cmd.addParameter('ArchiveID', archiveID);
    cmd.addParameter('PublishedFilter', publishedFilter);
    cmd.addParameter('PageNr', pageNr);
    cmd.addParameter('ItemsPerPage', itemsPerPage);
    return cmd;
  }
}
