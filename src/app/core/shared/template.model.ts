/**
 * Interface for single template
 */
export interface TemplateModel {
  /**
   *The Id of template, helpful during iteration
   */
  id: number;
  /**
   * The version of template (just a number)
   */
  version: number;
  /**
   * The author of template
   */
  author: string;
  /**
   * Link leading to the template image in assets folder
   */
  url: string;
  /**
   * Date of creation template (saved as a string!)
   */
  creationDate: string;
}
