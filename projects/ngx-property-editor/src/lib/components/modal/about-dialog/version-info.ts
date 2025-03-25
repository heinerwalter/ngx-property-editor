import { isDevMode } from '@angular/core';

/**
 * This class can store information on the built version of an application
 * for being displayed in an about-dialog.
 */
export class VersionInfo {

  /** Application title. */
  public appTitle: string | undefined = undefined;

  /** Name of the author of this application. */
  public author: string | undefined = undefined;

  /** Email address of the author of this application. */
  public authorEmail: string | undefined = undefined;

  /** Optional URL of an author or source code website. */
  public websiteUrl: string | undefined = undefined;

  /** Optional title of an author or source code website. */
  public websiteTitle: string | undefined = undefined;

  /** The year in which development of this application started. */
  public copyrightYearStart: number | undefined = undefined;

  /** The current year. */
  public get copyrightYearEnd(): number {
    return new Date().getFullYear();
  }

  /** The full copyright text. */
  public get copyright(): string {
    return `Copyright ${this.copyrightYearStart ? this.copyrightYearStart + ' – ' : ''}${this.copyrightYearEnd}${this.author ? ' ' + this.author : ''}`;
  }

  /** The current application version like '1.0.0'. */
  public version: string | undefined = undefined;

  /** Short hash of the current git commit like 'xxxxxxx'. */
  public gitCommit: string | undefined = undefined;

  /**
   * Result of the command `git describe`.
   * If the current commit has a tag (git tags relate to released versions in the format 'v1.0.0'),
   * this property contains the tag name. Otherwise, it contains the last tag,
   * the number of commits since that tag and the short commit hash (e.g. 'v1.0.0-2-xxxxxxx').
   * As long as there is no release tag, this property is an empty string.
   */
  public gitDescribe: string | undefined = undefined;

  /** The date and time at which the application was built. */
  public buildDate: Date | undefined = undefined;

  // region Additional information displayed in the about-dialog

  /** Optional information related to a database. */
  public databaseInfo: string | undefined = undefined;

  /** Optional information related to a server connection. */
  public serverInfo: string | undefined = undefined;

  // endregion

  // region Generated properties

  /**
   * True, if the current commit is a release version.
   * False, if modifications (commits) were made since the last release.
   */
  public isRelease: boolean;

  /**
   * True, if Angular is in development mode.
   * By default, this is true, unless enableProdMode is invoked prior to calling this method
   * or the application is built using the Angular CLI with the optimization option.
   */
  public isDevMode: boolean = false;

  // endregion

  public constructor(properties: {
    appTitle?: string | undefined,
    author?: string | undefined,
    authorEmail?: string | undefined,
    websiteUrl?: string | undefined,
    websiteTitle?: string | undefined,
    copyrightYearStart?: number | undefined,
    version?: string | undefined,
    gitCommit?: string | undefined,
    gitDescribe?: string | undefined,
    buildDate?: Date | undefined,
    databaseInfo?: string | undefined,
    serverInfo?: string | undefined,
  }) {
    this.appTitle = properties.appTitle?.trim() || undefined;
    this.author = properties.author?.trim() || undefined;
    this.authorEmail = properties.authorEmail?.trim() || undefined;
    this.websiteUrl = properties.websiteUrl?.trim() || undefined;
    this.websiteTitle = properties.websiteTitle?.trim() || undefined;
    this.copyrightYearStart = properties.copyrightYearStart && properties.copyrightYearStart > 0 ? properties.copyrightYearStart : undefined;
    this.version = properties.version?.trim() || undefined;
    this.gitCommit = properties.gitCommit?.trim() || undefined;
    this.gitDescribe = properties.gitDescribe?.trim() || undefined;
    this.buildDate = properties.buildDate;
    this.databaseInfo = properties.databaseInfo?.trim() || undefined;
    this.serverInfo = properties.serverInfo?.trim() || undefined;

    this.isRelease = this.getIsRelease();
    this.isDevMode = isDevMode();
  }

  /**
   * True, if the current commit is a release version.
   * False, if modifications (commits) were made since the last release.
   */
  private getIsRelease(): boolean {
    if (!this.gitDescribe) return false;
    return 'v' + this.version === this.gitDescribe;
  }

}
