import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */

export interface FullPageLayout {
  head: QuartzComponent // single component
  header: QuartzComponent[] // laid out horizontally
  beforeBody: QuartzComponent[] // laid out vertically
  pageBody: QuartzComponent // single component
  afterBody: QuartzComponent[] // laid out vertically
  left: QuartzComponent[] // vertical on desktop and tablet, horizontal on mobile
  right: QuartzComponent[] // vertical on desktop, horizontal on tablet and mobile
  footer: QuartzComponent // single component
}

const config: QuartzConfig = {
  configuration: {
    pageTitle: " ˙ ̟🫐 Rae's Garden",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "pt-BR",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#ccd0da",
          gray: "#7c7f93",
          darkgray: "#4c4f69",
          dark: "#8d5fc8",
          secondary: "#4c4f69",
          tertiary: "#df8e1d",
          highlight: "#ccd0da",
          textHighlight: "#303446",
        },
        darkMode: {
          light: "#11111b", 
          lightgray: "#1e1e2e",
          gray: "#babbf1",
          darkgray: "#e6e9f5",
          dark: "#cba6f7",
          secondary: "#bac2de",
          tertiary: "#f9e2af",
          highlight: "#313244",
          textHighlight: "#303446",
        },
      },
    },
  },

  
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.FolderPage({
        sortFn: (f1, f2) => {
          const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
          const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
          return f1Title.localeCompare(f2Title)
        },
      }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
