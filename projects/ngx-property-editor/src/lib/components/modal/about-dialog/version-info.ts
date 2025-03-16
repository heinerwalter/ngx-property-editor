/**
 * This class can store information on the built version of an application
 * for being displayed in an about dialog.
 */
export class VersionInfo {

  /** Application title. */
  public readonly appTitle: string;

  /** Name of the author of this application. */
  public readonly author: string;

  /** Email address of the author of this application. */
  public readonly authorEmail: string;

  /** Optional URL of a author or source code website. */
  public readonly websiteUrl: string | undefined = undefined;
 
  /** Optional title of a author or source code website. */ 
  public readonly websiteTitle: string | undefined = undefined; 
 
  /** The year in which development of this application started. */
  public readonly copyrightYearStart: number;

  /** The current year. */
  public get copyrightYearEnd(): number {
    return new Date().getFullYear();
  }

  /** The full copyright text. */
  public get copyright(): string {
    return `Copyright ${this.copyrightYearEnd} ${this.author}`
  }

  /** The current application version like '1.0.0'. */
  public readonly version: string;

  /** Short hash of the current git commit like 'xxxxxxx'. */
  public readonly gitCommit: string;

  /**
   * Result of the command `git describe`.
   * If the current commit has a tag (git tags relate to released versions in the format 'v1.0.0'),
   * this property contains the tag name. Otherwise, it contains the last tag,
   * the number of commits since that tag and the short commit hash (e.g. 'v1.0.0-2-xxxxxxx').
   * As long as there is no release tag, this property is an empty string.
   */
  public readonly gitDescribe: string;

  /** The date and time at which the application was built. */
  public readonly buildDate: Date;

  // Additional information displayed in the about dialog

  /** Optional information related to a database. */
  public databaseInfo: string | undefined = undefined;

  /** Optional information related to a server connection. */
  public connectionInfo: string | undefined = undefined;

  // Generated properties:

  /**
   * True, if the current commit is a release version.
   * False, if modifications (commits) were made since the last release.
   */
  public readonly isRelease: boolean;

  /**
   * True, if Angular is in development mode. By default, this is true, unless enableProdMode is invoked prior to calling this method or the application is built using the Angular CLI with the optimization option.
   */
  public readonly isDevMode: boolean;

  public constructor(appTitle: string,
                     author: string,
                     authorEmail: string,
                     websiteUrl: string | undefined,
                     websiteTitle: string | undefined, 
                     copyrightYearStart: number,
                     version: string,
                     gitCommit: string,
                     gitDescribe: string,
                     buildDate: Date,
                     isDevMode: boolean = false) {
    this.appTitle = appTitle?.trim() || '';
    this.author = author?.trim() || '';
    this.authorEmail = authorEmail?.trim() || '';
    this.websiteUrl = websiteUrl || undefined;
    this.websiteTitle = websiteTitle || undefined; 
    this.copyrightYearStart = copyrightYearStart;
    this.version = version?.trim() || '';
    this.gitCommit = gitCommit?.trim() || '';
    this.gitDescribe = gitDescribe?.trim() || '';
    this.buildDate = buildDate;

    this.isRelease = this.getIsRelease();
    this.isDevMode = !!isDevMode;
  }

  /**
   * True, if the current commit is a release version.
   * False, if modifications (commits) were made since the last release.
   */
  private getIsRelease(): boolean {
    return 'v' + this.version === this.gitDescribe;
  }

}
