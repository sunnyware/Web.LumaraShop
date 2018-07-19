import {JsonCommand} from '../utils/json/json-command';
import {Gastgeber} from '../models/gastgeber';
import {Fachberater} from '../models/fachberater';

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

  public static GetBlogPost(blogPostID: number): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Blogging.Service.BlogService';
    cmd.CommandName = 'GetBlogPost';
    cmd.addParameter('BlogPostID', blogPostID);
    return cmd;
  }

  /***** Fachberater *****/
  public static GetFachberater(): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
    cmd.CommandName = 'GetFachberater';
    return cmd;
  }

  public static UpdateFachberater(fb: Fachberater): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
    cmd.CommandName = 'UpdateFachberater';
    cmd.addParameter('Fachberater', fb);
    return cmd;
  }

  /***** Gastgeber *****/
  public static GetGastgeberlist(filter: string, onlyAktivGastgeber: boolean, pageNr: number, itemsPerPage: number): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
    cmd.CommandName = 'GetGastgeberlist';
    cmd.addParameter('PageNr', pageNr);
    cmd.addParameter('ItemsPerPage', itemsPerPage);
    cmd.addParameter('Filter', filter);
    cmd.addParameter('OnlyAktivGastgeber', onlyAktivGastgeber);
    return cmd;
  }


  public static UpdateGastgeber(gg: Gastgeber): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
    cmd.CommandName = 'UpdateGastgeber';
    cmd.addParameter('Gastgeber', gg);
    return cmd;
  }

  public static GetGastgeberStatistik(filterIDPersonalakte: number, datum1: Date, datum2: Date, mindestVortraege: number,
    mindestUmsatz: number, buildGroupedList, boolean): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
    cmd.CommandName = 'GetGastgeberStatistik';
    cmd.addParameter('FilterIDPersonalakte', filterIDPersonalakte);
    cmd.addParameter('Datum1', datum1);
    cmd.addParameter('Datum2', datum2);
    cmd.addParameter('MindestVortraege', mindestVortraege);
    cmd.addParameter('MindestUmsatz', mindestUmsatz);
    cmd.addParameter('BuildGroupedList', buildGroupedList);
    return cmd;
  }

  /***** Artikel *****/
  public static GetArtikelNichtLieferbar(): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
    cmd.CommandName = 'GetArtikelNichtLieferbar';
    return cmd;
  }

  /***** Aufträge *****/
  public static GetAuftraege(jahr: number): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
    cmd.CommandName = 'GetAuftraege';
    cmd.addParameter('Jahr', jahr);
    return cmd;
  }

   /***** Statistik *****/
  public static GetJahresspiegel(idPersonalakte: number, returnChefstatistik: boolean): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.StatistikService';
    cmd.CommandName = 'GetJahresspiegel';
    cmd.addParameter('IDPersonalakte', idPersonalakte);
    cmd.addParameter('ReturnChefstatistik', returnChefstatistik);
    return cmd;
  }

  public static GetJahresstatistik(idPersonalakte: number, jahr: number, returnChefstatistik: boolean): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.StatistikService';
    cmd.CommandName = 'GetJahresstatistik';
    cmd.addParameter('IDPersonalakte', idPersonalakte);
    cmd.addParameter('Jahr', jahr);
    cmd.addParameter('ReturnChefstatistik', returnChefstatistik);
    return cmd;
  }

   public static GetRankingList(jahr: number): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.StatistikService';
    cmd.CommandName = 'GetRankingList';
    cmd.addParameter('Jahr', jahr);
    return cmd;
  }
}
