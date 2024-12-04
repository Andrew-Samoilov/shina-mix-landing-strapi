import type { Schema, Struct } from '@strapi/strapi';

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
    displayName: '\u0418\u0443\u0442\u0443\u0430\u0448\u0435';
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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.feauture': ComponentsFeauture;
      'components.iutuashe': ComponentsIutuashe;
      'components.link': ComponentsLink;
      'layout.benefits-section': LayoutBenefitsSection;
      'layout.features-section': LayoutFeaturesSection;
      'layout.hero-section': LayoutHeroSection;
    }
  }
}
