package lab1.arrays;


public class UnorderedPeopleArray extends PeopleArray {

    public UnorderedPeopleArray(int max) {
        super(max);
    }

    /**
     * Insert a new person to the end of the array.
     * Return false if arr is full.
     *
     * @param first first name
     * @param last  last name
     * @param age   age
     */
    public boolean insert(String first, String last, int age) {
        if (nElems + 1 >= arr.length) return false;

        arr[nElems] = new Person(first, last, age);
        nElems++;
        return true;
    }

    /**
     * Return the Person with lastName, or null. Use SequentialSearch to find the target.
     *
     * @param lastName last name
     * @return person if found or null
     */
    public Person find(String lastName) {
        for (int i = 0; i < nElems; i++) {
            if (arr[i].getLastName().equals(lastName)) {
                return arr[i];
            }
        }
        return null;
    }

}

