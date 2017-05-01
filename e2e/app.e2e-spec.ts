import { LoginFormPage } from './app.po';

describe('login-form App', () => {
  let page: LoginFormPage;

  beforeEach(() => {
    page = new LoginFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
