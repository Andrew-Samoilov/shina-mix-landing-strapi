import type { Schema, Struct } from '@strapi/strapi';

export interface FooterFooter extends Struct.ComponentSchema {
  collectionName: 'components_footer_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    FooterLogo: Schema.Attribute.Component<'logo.logo', true>;
    FooterNav: Schema.Attribute.Component<'nav-bar.footer-nav', false>;
  };
}

export interface LogoLogo extends Struct.ComponentSchema {
  collectionName: 'components_logo_logos';
  info: {
    displayName: 'Logo';
  };
  attributes: {
    LogoMedia: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    URL: Schema.Attribute.String;
  };
}

export interface NavBarFooterNav extends Struct.ComponentSchema {
  collectionName: 'components_nav_bar_footer_navs';
  info: {
    displayName: 'FooterNav';
  };
  attributes: {};
}

export interface NavBarNavBar extends Struct.ComponentSchema {
  collectionName: 'components_nav_bar_nav_bars';
  info: {
    displayName: 'NavBar';
  };
  attributes: {
    SMLogo: Schema.Attribute.Component<'logo.logo', true>;
  };
}

export interface PageHero extends Struct.ComponentSchema {
  collectionName: 'components_page_heroes';
  info: {
    description: '';
    displayName: 'Hero';
  };
  attributes: {
    HeroBackgroud: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    HeroButton: Schema.Attribute.Component<'page.hero-button', true>;
    HeroDescription: Schema.Attribute.String;
    HeroTitle: Schema.Attribute.String;
  };
}

export interface PageHeroButton extends Struct.ComponentSchema {
  collectionName: 'components_page_hero_buttons';
  info: {
    description: '';
    displayName: 'Button';
  };
  attributes: {
    ButtonText: Schema.Attribute.String;
    ButtonUrl: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'footer.footer': FooterFooter;
      'logo.logo': LogoLogo;
      'nav-bar.footer-nav': NavBarFooterNav;
      'nav-bar.nav-bar': NavBarNavBar;
      'page.hero': PageHero;
      'page.hero-button': PageHeroButton;
    }
  }
}
