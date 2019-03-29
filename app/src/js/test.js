export default class A {
    static color = "red";
    counter = 0;
    
    handleClick = () => {
      this.counter++;
      console.log(this.counter);
    }
    
    handleLongClick() {
      this.counter++;
      console.log(this.counter);
    }
  }