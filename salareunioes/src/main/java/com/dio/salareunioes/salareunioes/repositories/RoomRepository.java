package com.dio.salareunioes.salareunioes.repositories;

import com.dio.salareunioes.salareunioes.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
}
