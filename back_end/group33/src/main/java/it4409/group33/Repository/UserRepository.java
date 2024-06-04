package it4409.group33.Repository;

import it4409.group33.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
    User findByPhone(String phone);
    Optional<User> findById(Long id);
    @Transactional
    default void setActiveStatusByEmail(String email, boolean activeStatus) {
        User user = findByEmail(email);
        if (user != null) {
            user.setActived(activeStatus);
            save(user);
        }
    }

}

