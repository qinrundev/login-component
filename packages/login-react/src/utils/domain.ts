export function getCurrentDomain() {
  return localStorage.getItem('current_domain');
}

export function setCurrentDomain(domainId: string) {
  localStorage.setItem('current_domain', domainId);
}
