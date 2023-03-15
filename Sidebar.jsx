import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${({ isOpen }) => (isOpen ? '300px' : '70px')};
  background-color: #f8f8f8;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  z-index: 1000;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const SidebarTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const SidebarList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const SidebarItem = styled.li`
  display: flex;
  align-items: center;
  padding: 16px;
  color: ${({ isActive }) => (isActive ? '#fff' : '#333')};
  background-color: ${({ isActive }) => (isActive ? '#007bff' : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? '#007bff' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

const SidebarIcon = styled.i`
  font-size: 1.25rem;
  margin-right: 16px;
`;

const SidebarLabel = styled.span`
  font-size: 1rem;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
`;

const Sidebar = ({ title, items, onItemSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item) => {
    onItemSelected(item);
    setIsOpen(false);
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <SidebarTitle>{title}</SidebarTitle>
        <SidebarIcon
          className={isOpen ? 'fa fa-chevron-left' : 'fa fa-chevron-right'}
          onClick={() => setIsOpen(!isOpen)}
        />
      </SidebarHeader>
      <SidebarList>
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            isActive={item.isActive}
            onClick={() => handleItemClick(item)}
          >
            <SidebarIcon className={`fa fa-${item.icon}`} />
            <SidebarLabel isActive={item.isActive}>{item.label}</SidebarLabel>
          </SidebarItem>
        ))}
      </SidebarList>
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      isActive: PropTypes.bool,
    })
  ),
  onItemSelected: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  items: [],
};

export default Sidebar;
