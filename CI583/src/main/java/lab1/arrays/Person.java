package lab1.arrays;

import java.util.Formatter;

public class Person {
    private final String lastName;
    private final String firstName;
    private final int age;

    public Person(String first, String last, int age) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
    }

    public String getLastName() {
        return lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public int getAge() {
        return age;
    }

    public String toString() {
        return new Formatter().format("Last name: %s,  first name: %s, age: %d",
                getLastName(), firstName, age).toString();
    }

    public boolean equals(Object o) {
        if (!(o instanceof Person that)) return false;
        return (firstName.equals(that.getFirstName())
                && lastName.equals(that.getLastName())
                && age == that.getAge());
    }

}


