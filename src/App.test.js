import React from 'react';
import ReactDOM from 'react-dom';
import 'jest-localstorage-mock';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {App} from './App';
import {Link, NavLink, Redirect, Route} from "react-router-dom";
import {Dashboard} from "./Components/Dashboard";
import {Books} from "./Components/Books";
import {BookDetail} from "./Components/Bookdetail";
import {ProtectedRoute} from "./hor/ProtectedRoute";

Enzyme.configure({ adapter: new Adapter() });

describe('Basic checkups', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});

describe('routing', () => {
  it('should have to correct routes mapped', () => {
    const wrapper = shallow(<App />);
    const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});
    expect(pathMap['/']).toBe(Dashboard);
    expect(pathMap['/dashboard/:name?']).toBe(Dashboard);
    expect(pathMap['/books']).toBe(Books);
    expect(pathMap['/:id']).toBe(BookDetail);
  });
});

describe('links', () => {
  const wrapper = shallow(<App />);
  const links = wrapper.find(Link);
  const navLinks = wrapper.find(NavLink);

  it('should use Navlinks instead of links', () => {
    expect(links.length).toEqual(1);
    expect(navLinks.length >= 3).toBe(true);
  });

  it('navlinks should add the class "activeLink"', () => {
    navLinks.forEach(link => {
      const props = link.props();
      expect(props.activeClassName).toBe("activeLink");
    });
  })
});

describe('Auth', () => {
  test('It should be persisted in the local storage', () => {
    const wrapper = mount(<App />);
    const logIn = wrapper.find('li > a');
    logIn.simulate('click');
    expect(localStorage.setItem).toHaveBeenLastCalledWith("authenticated", true.toString());
    expect(wrapper.state().authenticated).toBe(true);
    logIn.simulate('click');
    expect(localStorage.setItem).toHaveBeenLastCalledWith("authenticated", false.toString());
    expect(wrapper.state().authenticated).toBe(false);
    logIn.simulate('click');
    expect(localStorage.setItem).toHaveBeenLastCalledWith("authenticated", true.toString());
    expect(wrapper.state().authenticated).toBe(true);
  });

  test('It should use the value persisted in the local storage', () => {
    localStorage.clear();
    localStorage.setItem('authenticated', true.toString());
    const wrapper = mount(<App />);
    expect(localStorage.getItem).toHaveBeenLastCalledWith("authenticated");
    expect(wrapper.state().authenticated).toBe(true);
    wrapper.unmount();
    localStorage.setItem('authenticated', false.toString());
    wrapper.mount();
    expect(localStorage.getItem).toHaveBeenLastCalledWith("authenticated");
    expect(wrapper.state().authenticated).toBe(true);
  });
});

describe('Protected route', () => {
  test('It should be a component', () => {
    expect(typeof ProtectedRoute).toEqual('function');
  });

  test('If the user is authenticated it should return a Route rendering our component', () => {
    const wrapper = shallow(<ProtectedRoute loggedIn={true}/>);
    expect(wrapper.find(Route).length).toEqual(1);
    expect(wrapper.find(Redirect).length).toEqual(0);
  });

  test('If the user is not logged in it should return a Redirect to "/access-denied"', () => {
    const wrapper = shallow(<ProtectedRoute loggedIn={false}/>);
    expect(wrapper.find(Route).length).toEqual(0);
    expect(wrapper.find(Redirect).length).toEqual(1);
  });
});
