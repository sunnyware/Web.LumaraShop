export interface UserAccessRights {
  UserID: number;
  UserName: string;
  IsLumaraAdmin: boolean;
  AllowBuchhaltungModuleRead: boolean;
  AllowBuchhaltungModuleWrite: boolean;
  AllowVersandModuleRead: boolean;
  AllowVersandModuleWrite: boolean;
  AllowMitarbeiterlistRead: boolean;
  AllowMitarbeiterlistWrite: boolean;
}
