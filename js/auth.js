const USERS_KEY = 'ps_users_v1';
function getUsers(){ return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
function saveUsers(u){ localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
function registerUser(formData){
  const users = getUsers();
  if(users.find(u => u.email === formData.email)) return { ok:false, msg: 'Usuario ya existe' };
  let age;
  if(formData.birthdate){ const b = new Date(formData.birthdate); const diff = Date.now() - b.getTime(); age = new Date(diff).getUTCFullYear() - 1970; }
  const discount = computeUserDiscount({ email: formData.email, age, registrationCode: formData.registrationCode });
  const isDuoc = isDuocEmail(formData.email);
  const user = { id: Date.now(), ...formData, discount, isDuoc, createdAt: new Date().toISOString(), role: 'Cliente' };
  users.push(user); saveUsers(users);
  if(isDuoc && isBirthdayToday(formData.birthdate)) user.birthdayGift = true;
  return { ok:true, user };
}
function loginUser(email, password){
  const users = getUsers();
  const u = users.find(x => x.email === email && x.password === password);
  if(!u) return { ok:false, msg:'Credenciales inválidas' };
  localStorage.setItem('ps_session', JSON.stringify({ userId: u.id, email: u.email, role: u.role || 'Cliente' }));
  return { ok:true, user: u };
}
function isBirthdayToday(birthdate){
  if(!birthdate) return false;
  const b = new Date(birthdate); const today = new Date();
  return b.getDate() === today.getDate() && b.getMonth() === today.getMonth();
}