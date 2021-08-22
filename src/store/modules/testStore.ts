import { observable } from "mobx";

interface TestStoreProps {
  number: number;
  increase: () => void;
}

const Tstore = observable<TestStoreProps>({
  number: 1,
  increase() {
    this.number++;
  },
});
export default Tstore;
