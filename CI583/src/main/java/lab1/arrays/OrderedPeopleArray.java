package lab1.arrays;

public class OrderedPeopleArray extends PeopleArray {

    public OrderedPeopleArray(int max) {
        super(max);
    }

    /**
     * Insert a new person maintaining the order of the data.
     * Return false if arr is full.
     *
     * @param first the first name
     * @param last  the last name
     * @param age   their age
     */
    public boolean insert(String first, String last, int age) {
        if (nElems >= arr.length) return false; // full

        for (int i = 0; i < nElems; i++) {
            // Find where to insert
            if (last.compareTo(arr[i].getLastName()) <= 0) {
                // Shuffle everything right
                for (int j = nElems; j > i; j--) {
                    arr[j] = arr[j - 1];
                }
                arr[i] = new Person(first, last, age);
                nElems++;   // increment
                return true;
            }
        }

        // Add to the end if greater than everything
        arr[nElems] = new Person(first, last, age);
        nElems++;   // increment
        return true;
    }

    /**
     * Return the Person with lastName, or null. Use BinarySearch to do the finding.
     *
     * @param lastName the last name
     * @return a person or null
     */
    public Person find(String lastName) {
        int low = 0;
        int high = nElems - 1;
        int mid;

        while (low <= high) {
            mid = (high + low) / 2;

            int direction = lastName.compareTo(arr[mid].getLastName());

            if (direction > 0)
            {
                low = mid + 1;  // left half
            }
            else if (direction < 0)
            {
                high = mid - 1; // right half
            }
            else {
                // Found
                return arr[mid];
            }
        }
        return null;
    }
}

