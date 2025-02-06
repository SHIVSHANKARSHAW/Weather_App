/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/api/weather`; params?: Router.UnknownInputParams; } | { pathname: `/constants/constants`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Homepage`; params?: Router.UnknownInputParams; } | { pathname: `/theme/theme`; params?: Router.UnknownInputParams; } | { pathname: `/utils/asyncStorage`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/api/weather`; params?: Router.UnknownOutputParams; } | { pathname: `/constants/constants`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Homepage`; params?: Router.UnknownOutputParams; } | { pathname: `/theme/theme`; params?: Router.UnknownOutputParams; } | { pathname: `/utils/asyncStorage`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/api/weather${`?${string}` | `#${string}` | ''}` | `/constants/constants${`?${string}` | `#${string}` | ''}` | `/screens/Homepage${`?${string}` | `#${string}` | ''}` | `/theme/theme${`?${string}` | `#${string}` | ''}` | `/utils/asyncStorage${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/api/weather`; params?: Router.UnknownInputParams; } | { pathname: `/constants/constants`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Homepage`; params?: Router.UnknownInputParams; } | { pathname: `/theme/theme`; params?: Router.UnknownInputParams; } | { pathname: `/utils/asyncStorage`; params?: Router.UnknownInputParams; };
    }
  }
}
