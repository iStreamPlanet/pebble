import './TenantMenu.scss';

import * as React from 'react';

import Block from '../Block/Block';
import Button from '../Button/Button';
import Heading from '../Heading/Heading';
import Icon from '../Icon/Icon';
import Link from '../Link/Link';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import { motion } from 'framer-motion';
import { tenantType } from '../../Types';
import { useMobileLayout } from '../../Hooks';

const propTypes = {
  /**
   * Highlight the currently selected organization
   */
  currentTenantId: PropTypes.string,
  /**
   * Message to display if their are no tenants
   */
  emptyMessage: PropTypes.node,
  /**
   * Callback function when defined, display a button to create a new tenant
   */
  onAddTenant: PropTypes.func,
  /**
   * Function to call when a tenant is clicked
   */
  onTenantChange: PropTypes.func,
  /**
   * Callback function when defined, display a button to hide the tenant menu
   */
  onCloseTenantMenu: PropTypes.func,
  /**
   * A list of tenants the current user has access to
   */
  tenants: tenantType,
};

const defaultProps = {
  emptyMessage: 'There are no organizations',
};

const variants = {
  popUp: (custom) => {
    return {
      opacity: [0, 1],
      y: [24, 0],
      transition: {
        type: 'spring',
        duration: 0.2,
        delay: custom / 16,
      },
    };
  },
};

function TenantMenu(props) {
  const {
    currentTenantId,
    emptyMessage,
    onTenantChange,
    onAddTenant,
    tenants,
    onCloseTenantMenu,
  } = props;

  const isMobile = useMobileLayout();

  const renderHeader = () => {
    return (
      <Block
        color="neutral-100"
        background="black-30"
        padding={['2 5', '3 5']}
        alignItems="center"
        className="relative"
        itemSpacing="3"
        justify="between"
      >
        <Block alignItems="center" itemSpacing="2">
          <Heading
            element="4"
            color="neutral-100"
            size="5"
            responsive={false}
          >
            Organizations
          </Heading>
          {onAddTenant && (
            <Button
              onClick={onAddTenant}
              size="small"
              icon="add-bold"
              accessibilityLabel="add organization"
              plain
              className="brand-orange neutral-100-hover"
            />
          )}
        </Block>
        {onCloseTenantMenu && (
          <Button
            onClick={onCloseTenantMenu}
            icon={isMobile ? 'close' : 'nav-left'}
            plain
            accessibilityLabel="close organization menu"
            className="neutral-300 neutral-100-hover p-2"
          />
        )}
      </Block>
    );
  };

  const renderTenants = () => {
    if (!tenants || (tenants && tenants.length === 0)) {
      return (
        <Block direction="column" padding="5" color="neutral-300">
          <Block
            border={{ side: 'all', color: 'neutral-600' }}
            radius="2"
            padding="5"
            justify="center"
          >
            {emptyMessage}
          </Block>
        </Block>
      );
    }

    const tenantMarkup = (
      <motion.ul className="tenant-menu">
        {tenants.map(({ name, realm, id, url }, i) => (
          <motion.li
            className="bg-hover bg-neutral-800-hover"
            key={i}
            custom={i}
            animate="popUp"
            variants={variants}
            whileHover={{ paddingLeft: 8 }}
          >
            <Link
              external
              href={url}
              onClick={onTenantChange}
              className="tenant-link"
            >
              <Block
                alignItems="center"
                itemSpacing="2"
                padding="3 5"
              >
                <Block direction="column" flex>
                  <Text bold>{name}</Text>
                  <Text color="neutral-400" size="6">
                    {realm}
                  </Text>
                </Block>
                {id === currentTenantId && (
                  <Block
                    justify="center"
                    alignItems="center"
                    width="16px"
                    height="16px"
                    background="white"
                    className="relative"
                  >
                    <Icon
                      name="check-circle"
                      className="brand-orange absolute"
                      accessibilityLabel="currently selected organization"
                      size="24"
                    />
                  </Block>
                )}
              </Block>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    );
    return (
      <Block
        direction="column"
        className="pb-5"
        overflow={{ vertical: 'auto' }}
      >
        {tenantMarkup}
      </Block>
    );
  };

  return (
    <Block
      height="100"
      width="100"
      background="neutral-700"
      direction="column"
    >
      {renderHeader()}
      {renderTenants()}
    </Block>
  );
}

TenantMenu.propTypes = propTypes;
TenantMenu.defaultProps = defaultProps;
TenantMenu.displayName = 'TenantMenu';

export default TenantMenu;
