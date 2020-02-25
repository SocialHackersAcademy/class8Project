class Encrypter {
  Encrypter() {
    const pass;
    const hashed_pass;
  }
  encrypt(password) {
    this.pass = password;
    const salt = await bcrypt.genSalt(10);
    pass = await bcrypt.hash(pass, salt);
    return pass;
  }
  match(password, hashp) {
    this.pass = password;
    this.hashed_pass = hashp;
    const salt = await bcrypt.genSalt(10);
    pass = await bcrypt.hash(pass, salt);
    if (pass.toString().match(hashed_pass)) {
       return true;
    } else {
       return false;
    }
  }
}
export default Encrypter;
