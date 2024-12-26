import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsBrand extends Struct.ComponentSchema {
  collectionName: 'components_components_brands';
  info: {
    displayName: 'Brand';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    name: Schema.Attribute.String;
  };
}

export interface ComponentsContact extends Struct.ComponentSchema {
  collectionName: 'components_components_contacts';
  info: {
    description: '';
    displayName: 'Contact';
  };
  attributes: {
    destination: Schema.Attribute.Text;
    destinationTitle: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'components.link', false>;
    name: Schema.Attribute.String;
  };
}

export interface ComponentsFeauture extends Struct.ComponentSchema {
  collectionName: 'components_components_feautures';
  info: {
    displayName: 'Feauture';
  };
  attributes: {
    header: Schema.Attribute.String;
    number: Schema.Attribute.String;
    subHeader: Schema.Attribute.String;
  };
}

export interface ComponentsIutuashe extends Struct.ComponentSchema {
  collectionName: 'components_components_iutuashe';
  info: {
    description: '';
    displayName: 'Benefit';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface ComponentsLink extends Struct.ComponentSchema {
  collectionName: 'components_components_links';
  info: {
    description: '';
    displayName: 'Link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ComponentsLogoTxt extends Struct.ComponentSchema {
  collectionName: 'components_components_logo_txts';
  info: {
    displayName: 'logoTxt';
  };
  attributes: {
    logoTxt: Schema.Attribute.Component<'components.link', true>;
  };
}

export interface ComponentsMenu extends Struct.ComponentSchema {
  collectionName: 'components_components_menus';
  info: {
    displayName: 'menu';
  };
  attributes: {
    menuItem: Schema.Attribute.Component<'components.link', true>;
  };
}

export interface ComponentsMenuItems extends Struct.ComponentSchema {
  collectionName: 'components_components_menu_items';
  info: {
    displayName: 'menuItems';
  };
  attributes: {
    menuItem: Schema.Attribute.Component<'components.link', false>;
  };
}

export interface ComponentsSert extends Struct.ComponentSchema {
  collectionName: 'components_components_serts';
  info: {
    description: '';
    displayName: 'sert';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.String;
  };
}

export interface LayoutBenefitsSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_benefits_sections';
  info: {
    description: '';
    displayName: 'Benefits Section';
  };
  attributes: {
    benefit: Schema.Attribute.Component<'components.iutuashe', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface LayoutBrendsSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_brends_sections';
  info: {
    description: '';
    displayName: 'Brands Section';
  };
  attributes: {
    brand: Schema.Attribute.Component<'components.brand', true>;
    title: Schema.Attribute.String;
  };
}

export interface LayoutContactSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_contact_sections';
  info: {
    description: '';
    displayName: 'Contact Section';
    icon: 'phone';
  };
  attributes: {
    contact: Schema.Attribute.Component<'components.contact', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface LayoutFeaturesSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_features_sections';
  info: {
    description: '';
    displayName: 'Features Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    feature: Schema.Attribute.Component<'components.feauture', true>;
    title: Schema.Attribute.String;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    description: '';
    displayName: 'Footer';
  };
  attributes: {
    logoText: Schema.Attribute.Component<'components.link', false>;
    socialLinks: Schema.Attribute.Component<'components.link', true>;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    description: '';
    displayName: 'Header';
  };
  attributes: {
    logoText: Schema.Attribute.Component<'components.link', false>;
    menuItems: Schema.Attribute.Component<'components.link', true>;
  };
}

export interface LayoutHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_hero_sections';
  info: {
    description: '';
    displayName: 'Hero Section';
  };
  attributes: {
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'components.link', false>;
    subHeading: Schema.Attribute.Text;
  };
}

export interface LayoutPriceSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_price_sections';
  info: {
    description: '';
    displayName: 'Price Section';
    icon: 'priceTag';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface LayoutSertSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_sert_sections';
  info: {
    description: '';
    displayName: 'Sert Section';
  };
  attributes: {
    sert: Schema.Attribute.Component<'components.sert', true>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.brand': ComponentsBrand;
      'components.contact': ComponentsContact;
      'components.feauture': ComponentsFeauture;
      'components.iutuashe': ComponentsIutuashe;
      'components.link': ComponentsLink;
      'components.logo-txt': ComponentsLogoTxt;
      'components.menu': ComponentsMenu;
      'components.menu-items': ComponentsMenuItems;
      'components.sert': ComponentsSert;
      'layout.benefits-section': LayoutBenefitsSection;
      'layout.brends-section': LayoutBrendsSection;
      'layout.contact-section': LayoutContactSection;
      'layout.features-section': LayoutFeaturesSection;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'layout.hero-section': LayoutHeroSection;
      'layout.price-section': LayoutPriceSection;
      'layout.sert-section': LayoutSertSection;
    }
  }
}
