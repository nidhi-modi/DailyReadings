import gql from 'graphql-tag';

export const GET_DAILY_READINGS = gql`
  query MyQuery {
    user_registration {
      bore1hours
      bore1m3
      currentdate
      dateyesterday
      dayyesterday
      draindischarge
      electricity
      g1northdrainec
      g1northdrainmls
      g1northdrainph
      g1northdripec
      g1northdripmls
      g1northdripph
      g1southdrainec
      g1southdrainmls
      g1southdrainph
      g1southdripec
      g1southdripmls
      g1southdripph
      g1valve1dripmls
      g1valve2dripmls
      g1valve3dripmls
      g1valve4dripmls
      g2northdrainec
      g2northdrainmls
      g2northdrainph
      g2northdripec
      g2northdripmls
      g2northdripph
      g2southdrainec
      g2southdrainmls
      g2southdrainph
      g2southdripec
      g2southdripmls
      g2southdripph
      g2valve10dripmls
      g2valve11dripmls
      g2valve12dripmls
      g2valve5dripmls
      g2valve6dripmls
      g2valve7dripmls
      g2valve8dripmls
      g2valve9dripmls
      g3northdrainec
      g3northdrainmls
      g3northdrainph
      g3northdripec
      g3northdripmls
      g3northdripph
      g3southdrainec
      g3southdrainmls
      g3southdrainph
      g3southdripec
      g3southdripmls
      g3southdripph
      g3valve13dripmls
      g3valve14dripmls
      g3valve15dripmls
      g3valve16dripmls
      g3valve17dripmls
      g3valve18dripmls
      g3valve19dripmls
      g3valve20dripmls
      g4northdrainec
      g4northdrainmls
      g4northdrainph
      g4northdripec
      g4northdripmls
      g4northdripph
      g4southdrainec
      g4southdrainmls
      g4southdrainph
      g4southdripec
      g4southdripmls
      g4southdripph
      g4valve21dripmls
      g4valve22dripmls
      g4valve23dripmls
      g4valve24dripmls
      g5firstdrainec
      g5firstdrainmls
      g5firstdrainph
      g5firstdripec
      g5firstdripmls
      g5firstdripph
      g5seconddrainec
      g5seconddrainmls
      g5seconddrainph
      g5seconddripec
      g5seconddripmls
      g5seconddripph
      g5valve25dripmls
      g5valve26dripmls
      g5valve27dripmls
      gas
      liquidco2
      septicm3
      site_name
    }
  }
`;
