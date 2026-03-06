package lab1.arrays;

// Base class
public abstract class PeopleArray {

    protected Person[] arr; //the array storing Person objects
    protected int nElems;   //the number of Person objects currently stored

    public PeopleArray(int max) {
        arr = new Person[max];
        nElems = 0;
    }

    /**
     * Reset the array
     */
    public void clear() {
        arr = new Person[arr.length];
        nElems = 0;
    }

    /**
     * Remove the Person object with lastName from the array. Return false if the person is not found, true otherwise.
     * One way to do this is to use one loop to find the index of the object then, starting from the position of the
     * object, loop through the rest of the array setting arr[i] to arr[i+1]
     *
     * @param lastName the last name
     * @return true if successful, false otherwise
     */
    public boolean delete(String lastName) {
        boolean found = false;

        for (int i = 0; i < nElems; i++) {
            if (arr[i].getLastName().equals(lastName)) {
                found = true;
                for (int j = i; j < nElems - 1; j++) {
                    arr[j] = arr[j + 1];
                }
                arr[nElems - 1] = null;
                nElems--;
                break;
            }
        }
        return found;
    }

    /**
     * Return the Person with lastName, or null. This method is abstract and must
     * be overridden in subclasses of PeopleArray.
     *
     * @param lastName the last name
     * @return the person if found, or null
     */
    public abstract Person find(String lastName);

    /**
     * Insert a new Person object into the array and return `true`, or return false
     * if arr is full. This method is abstract and must be overridden in subclasses of PeopleArray.
     *
     * @param first first name
     * @param last  last name
     * @param age   age as int
     */
    public abstract boolean insert(String first, String last, int age);

    public String getLastNames() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < nElems; i++) {
            Person p = arr[i];
            sb.append(p.getLastName());
            sb.append("\n");
        }
        return sb.toString();
    }

    public boolean equals(Object o) {
        if (!(o instanceof PeopleArray that)) return false;
        if (nElems != that.nElems) return false;

        boolean eq = true;
        for (int i = 0; i < nElems; i++) {
            if (!arr[i].equals(that.arr[i])) {
                eq = false;
                break;
            }
        }
        return eq;
    }
}