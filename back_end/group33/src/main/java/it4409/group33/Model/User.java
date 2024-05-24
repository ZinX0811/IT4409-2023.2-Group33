package it4409.group33.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private String role;
    private String firstName;
    private String lastName;
    private int isActived;
    private int deleted;

    public User() {

    }

    public User(String username, String password,String firstName,String lastName, String email, String phone, String role, int deleted, int isActived) {
        this.username = username;
        this.password = password;
        this.lastName = lastName;
        this.firstName = firstName;
        this.deleted = deleted;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.isActived = isActived;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public int getIsActived() {
        return isActived;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setIsActived(int isActived) {
        this.isActived = isActived;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDeleted(int deleted) {
        this.deleted = deleted;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int isActived() {
        return isActived;
    }

    public void setActived(int actived) {
        isActived = actived;
    }

    public String getPhone() {
        return phone;
    }

    public int getDeleted() {
        return deleted;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

}

